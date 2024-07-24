const express = require("express");
const app = express();
const port = 3000;

// Set the view engine to EJS
app.set("view engine", "ejs");

// Middleware to serve static files
app.use(express.static("public"));

// Sample data to pass to the template
const data = {
  title: "My Express App",
  message: "Hello, World!",
};

// Route to render the home page
app.get("/", (req, res) => {
  res.render("index", data);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
