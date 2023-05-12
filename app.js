const { MongoClient, MongoKerberosError } = require('mongodb');
const mongoose = require('mongoose');
const DB_NAME = 'fruitsDB';
mongoose.connect(`mongodb://127.0.0.1:27017/${DB_NAME}`, {
  useNewUrlParser: true,
});

console.log(`Successfully connected to db ${DB_NAME}`);

const fruitsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please check your data entry, no name specified!'],
  },
  rating: {
    type: Number,
    min: 1,
    max: 10,
  },
  review: String,
});

const Fruit = mongoose.model('Fruit', fruitsSchema);

const fruit = new Fruit({
  name: 'Apple',
  rating: 8,
  review: 'Great fruit',
});

// Uncomment the following code to save a fruit document to the database
// fruit
//   .save()
//   .then(() => {
//     console.log('Fruit saved successfully');
//   })
//   .catch((error) => {
//     console.error('Error saving fruit:', error);
//   });

const banana = new Fruit({
  name: 'Banana',
  rating: 3,
  review: 'Weird texture',
});

const orange = new Fruit({
  name: 'Orange',
  rating: 6,
  review: 'Kinda sour',
});

// Uncomment the following code to insert multiple fruit documents to the database
// Fruit.insertMany([banana, orange])
//   .then((docs) => {
//     const savedNames = docs.map((doc) => doc.name);
//     const savedString = savedNames.join(', ');
//     console.log(`${savedString} saved successfully`);
//     mongoose.connection.close();
//   })
//   .catch((error) => {
//     console.error('Error saving fruits:', error);
//     mongoose.connection.close();
//   });

Fruit.find()
  .then((fruits) => {
    const savedNames = fruits.map((fruit) => fruit.name);
    console.log('Found the following documents:');
    console.log(savedNames);
    mongoose.connection.close();
  })
  .catch((error) => {
    console.error(error);
  });
