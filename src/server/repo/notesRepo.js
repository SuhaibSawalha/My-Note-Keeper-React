const { MongoClient, ObjectId } = require("mongodb");

const url = "mongodb://localhost:27017";
const dbName = "MyNoteKeeper";
const collectionName = "notes";

let currentId = 0;

function notesRepo() {
  const load = async (notes) => {
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
  };

  const get = async (query = {}, limit = 0) => {
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
  };

  const getById = async (id) => {
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
  };

  const post = async (note) => {
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
  };

  const put = async (id, note) => {
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
  };

  const remove = async (id) => {
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
  };

  return { load, get, getById, post, put, remove };
}

module.exports = notesRepo();
