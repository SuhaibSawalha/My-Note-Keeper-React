const { MongoClient, ObjectId } = require("mongodb");

const url = "mongodb://localhost:27017";
const dbName = "MyNoteKeeper";
const collectionName = "notes";

let currentId = 0;

function notesRepo() {
  async function load(notes) {
    return new Promise(async (resolve, reject) => {
      const client = new MongoClient(url);
      try {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        for (let note of notes) {
          note._id = ++currentId;
        }
        const results = await collection.insertMany(notes);
        resolve(results);
      } catch (error) {
        reject(error);
      } finally {
        client.close();
      }
    });
  }

  async function get(query = {}, limit = 0) {
    return new Promise(async (resolve, reject) => {
      const client = new MongoClient(url);
      try {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        const results = await collection.find(query).toArray();
        if (limit > 0) {
          results = results.slice(0, limit);
        }
        resolve(results);
      } catch (error) {
        reject(error);
      } finally {
        client.close();
      }
    });
  }

  async function getById(id) {
    return new Promise(async (resolve, reject) => {
      const client = new MongoClient(url);
      try {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        const results = await collection.findOne({
          _id: id,
        });
        resolve(results);
      } catch (error) {
        reject(error);
      } finally {
        client.close();
      }
    });
  }

  async function post(note) {
    return new Promise(async (resolve, reject) => {
      const client = new MongoClient(url);
      try {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        note._id = ++currentId;
        const results = await collection.insertOne(note);
        resolve(results);
      } catch (error) {
        reject(error);
      } finally {
        client.close();
      }
    });
  }

  async function put(id, note) {
    return new Promise(async (resolve, reject) => {
      const client = new MongoClient(url);
      try {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        note._id = id;
        const results = await collection.findOneAndReplace({ _id: id }, note, {
          returnDocument: "after",
        });
        resolve(results);
      } catch (error) {
        reject(error);
      } finally {
        client.close();
      }
    });
  }

  async function remove(id) {
    return new Promise(async (resolve, reject) => {
      const client = new MongoClient(url);
      try {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        const results = await collection.deleteOne({ _id: id });
        resolve(results);
      } catch (error) {
        reject(error);
      } finally {
        client.close();
      }
    });
  }

  return { load, get, getById, post, put, remove };
}

module.exports = notesRepo();
