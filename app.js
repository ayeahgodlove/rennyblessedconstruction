const express = require("express");
const path = require("path");
const app = express();
const bodyParser = require("body-parser");

require("dotenv").config();

const port = process.env.SERVER_PORT;

// Use ejs-layouts

// Set the view engine to EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(bodyParser.urlencoded({ extended: false }));

// app.use(ejsLayouts.express);
// // Define the layout to be used
// app.set("layout", "layout/layout");

// Middleware to serve static files
app.use(express.static("public"));
app.use(express.static(path.join(__dirname, "public")));

// Sample data to pass to the template
const data = {
  title: "Travisa - Visa & Immigration Website - Home",
  message: "Hello, World!",
};

// Route to render the home page
app.get("/", (req, res) => {
  res.render("index");
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
