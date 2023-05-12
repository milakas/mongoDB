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

const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  favouriteFruit: fruitsSchema,
});

const Person = mongoose.model('Person', personSchema);

const pineapple = new Fruit({
  name: 'Pineapple',
  rating: 9,
  review: 'Great fruit',
});

// pineapple.save();

const person = new Person({
  name: 'Amy',
  age: 12,
  favouriteFruit: pineapple,
});

// person.save();

const kiwi = new Fruit({
  name: 'Kiwi',
  rating: 7,
  review: 'Decent fruit',
});

// kiwi.save();

// Uncomment the following code if you want to update a document in the collection
// Person.updateOne({ name: 'John' }, { favouriteFruit: kiwi })
//   .then(() => {
//     console.log(`Document updated.`);
//   })
//   .catch((error) => {
//     console.error(error);
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

// Uncomment the following code if you want to update a document in the collection
// Fruit.updateOne({ _id: '645e0555d46386ab3181c783' }, { name: 'Mango' })
//   .then(() => {
//     console.log(`Document updated.`);
//   })
//   .catch((error) => {
//     console.error(error);
//   });

// Uncomment the following code if you want to delete a document in the collection
