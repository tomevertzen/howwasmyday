const { MongoClient } = require("mongodb");

const uri = process.env.ATLAS_URI;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let database;

const connectToDb = async () => {
  if (database) {
    return database;
  }

  try {
    const database = client.db("howwasmyday");
    return database;
  } finally {
    await client.close();
  }
};

// const getDb = async () => {
//   if (database) {
//     return database.collection("habitcards");
//   }
// };

module.exports = { connectToDb, database };
