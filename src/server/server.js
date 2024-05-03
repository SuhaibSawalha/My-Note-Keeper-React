const { MongoClient } = require("mongodb");
const notesRepo = require("./repo/notesRepo");
const initalNotes = require("./db/data.json");
require("./api/app");

const url = "mongodb://localhost:27017";
const dbName = "MyNoteKeeper";
const collectionName = "notes";

(async function main() {
  const client = new MongoClient(url);
  try {
    await client.connect();
    await client.db(dbName).dropDatabase();
    await notesRepo.load(initalNotes);
  } catch (error) {
    console.log(error);
  } finally {
    client.close();
  }
})();
