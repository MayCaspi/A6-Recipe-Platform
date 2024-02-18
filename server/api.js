const express = require('express');
const { MongoClient } = require('mongodb');
const app = express();
const port = 3000;

// Middleware to parse JSON in requests
app.use(express.json());

const mongoURI = 'mongodb+srv://shaygarbuz:<2207>@recipes.rp3ubau.mongodb.net/?retryWrites=true&w=majority'; // replace with your MongoDB connection string
const dbName = 'Recipes'; // replace with your database name

let db;

MongoClient.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log('Connected to MongoDB');
  db = client.db(dbName);
});

// Sample route
app.get('/', (req, res) => {
  res.send('Hello, this is your Node.js API!');
});

// API route to get all recipes
app.get('/api/recipes', async (req, res) => {
  const recipes = await db.collection('recipes').find().toArray();
  res.json(recipes);
});

// API route to add a new recipe
app.post('/api/recipes', async (req, res) => {
  const newRecipe = req.body;
  const result = await db.collection('recipes').insertOne(newRecipe);
  res.json(result.ops[0]);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
