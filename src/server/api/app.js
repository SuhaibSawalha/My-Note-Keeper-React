const Joi = require("joi");
const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());

const notesRepo = require("../repo/notesRepo");

const validId = (id) => {
  return /^\d+$/.test(id);
};

app.get("/api/notes", async (req, res) => {
  res.send(await notesRepo.get());
});

app.get("/api/notes/search", async (req, res) => {
  const query = req.query;
  const notes = await notesRepo.get(query);
  if (!notes.length) {
    return res.status(404).send("Note not found");
  }
  res.send(notes);
});

app.get("/api/notes/:id", async (req, res) => {
  const id = req.params.id;
  if (!validId(id)) {
    return res.status(400).send("Invalid id format");
  }
  const note = await notesRepo.getById(parseInt(id));
  if (!note) {
    return res.status(404).send("Note not found");
  }
  res.send(note);
});

const schema = Joi.object({
  title: Joi.string().min(1).required(),
  content: Joi.string().min(1).required(),
  creationDate: Joi.date().required(),
}).strict();
const validateNote = (note) => {
  return schema.validate({
    title: note.title,
    content: note.content,
    creationDate: new Date(note.creationDate),
  });
};

app.post("/api/notes", async (req, res) => {
  const body = req.body;
  const { error } = validateNote(body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  const note = await notesRepo.post(body);
  res.send(note);
});

app.put("/api/notes/:id", async (req, res) => {
  const id = req.params.id;
  const body = req.body;
  if (!validId(id)) {
    return res.status(400).send("Invalid id format");
  }
  const note = await notesRepo.getById(parseInt(id));
  if (!note) {
    return res.status(404).send("Note not found");
  }
  const { error } = validateNote(body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  const newNote = await notesRepo.put(parseInt(id), body);
  res.send(newNote);
});

app.delete("/api/notes/:id", async (req, res) => {
  const id = req.params.id;
  if (!validId(id)) {
    return res.status(400).send("Invalid id format");
  }
  const note = await notesRepo.getById(parseInt(id));
  if (!note) {
    return res.status(404).send("Note not found");
  }
  await notesRepo.remove(parseInt(id));
  res.send(note);
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
