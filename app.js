const { MongoClient } = require('mongodb');
const url = 'mongodb://127.0.0.1:27017';

const client = new MongoClient(url, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

run();

async function run() {
  try {
    await client.connect();
    const db = client.db('fruitsDB');
    console.log(`Successfully connected to db ${db.databaseName}`);
    await insertDocuments(db, function () {
      client.close();
    });
    const cursor = db.collection('fruits').find({});
    await cursor.forEach(console.dir);
  } catch (err) {
    console.error(`we encountered ${err}`);
  } finally {
    await client.close();
  }
}

const insertDocuments = async function (db, callback) {
  const collection = db.collection('fruits');

  const count = await collection.countDocuments();
  if (count === 0) {
    await collection.insertMany([
      { name: 'Apple', score: 8, review: 'Great fruit' },
      { name: 'Orange', score: 6, review: 'Kinda sour' },
      { name: 'Banana', score: 9, review: 'Great stuff' },
    ]);
    console.log(`Records are inserted`);
  } else {
    console.log(`Records already exist`);
  }
};
