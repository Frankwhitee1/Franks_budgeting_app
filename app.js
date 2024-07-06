const express = require("express"); // Import the Express library

const cors = require("cors"); // Import the CORS library

const app = express(); // Create an Express application

app.use(express.json()); // Tell the app to use JSON for request bodies

app.use(cors()); // Enable CORS to allow cross-origin requests

const transactionsController = require("./controllers/transactionsController"); // Import the transactions controller

app.get("/", (req, res) => { // Define a route for the root URL
    res.send("Welcome to Franks Budgeting App"); // Send a welcome message when someone visits the root URL
});

app.use("/transactions", transactionsController); // Use the transactions controller for routes starting with /transactions

module.exports = app; // Export the app object so it can be used in other files
