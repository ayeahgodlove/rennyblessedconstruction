const express = require("express");
const path = require("path");
const app = express();
const bodyParser = require("body-parser");
const { dbAuthenticate } = require("./config/database.config");

require("dotenv").config();

const port = process.env.SERVER_PORT;

// Set the view engine to EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(bodyParser.urlencoded({ extended: false }));

// Middleware to serve static files
app.use(express.static("public"));
app.use(express.static(path.join(__dirname, "public")));

/**
 * connect to database
 */
// Test the connection
dbAuthenticate();

// Route to render the home page
app.get("/", (req, res) => {
  res.render("pages/index");
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
