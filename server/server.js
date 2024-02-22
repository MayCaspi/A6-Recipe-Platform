const express = require('express')
const mongoose = require('mongoose')

// The rest of your code remains the same...

const app = express();
const port = 3000;

// Middleware to parse JSON in requests
app.use(express.json());

const mongoURI = 'mongodb+srv://maycaspi:Aa123456@recipeapi.m3qrh15.mongodb.net/?retryWrites=true&w=majority'; // replace with your MongoDB connection string
const dbName = 'recipeAPI'; // replace with your database name

let db;
async function connect(){
  try{
    await mongoose.connect(mongoURI)
    console.log("connected to MongoDB");
  }catch(error){
    console.log("error");
  }
}

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

connect();