const app = require("./app.js"); // Import the web server setup

require("dotenv").config(); // Load settings from .env file
const PORT = process.env.PORT; // Get the port number from settings

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`); // Start the server and log a message
});
