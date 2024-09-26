const express = require("express");
const path = require("path");
const app = express();
const bodyParser = require("body-parser");
const { dbAuthenticate } = require("./services/database.config");
const session = require("express-session");

require("dotenv").config();
const passport = require("passport");
const flash = require("connect-flash");

// Passport config
require("./config/passport-auth")(passport);

const authRoutes = require("./routes/auth");
const serviceRouter = require("./routes/admin/service.route");
const testimonialRouter = require("./routes/admin/testimonials.route");
const pagesRouter = require("./routes/pages.route");
const {
  ensureAuthenticated,
} = require("./config/middleware/is-authenticated.middleware");
const checkRole = require("./config/middleware/is-authorized.middle");
const categoryRouter = require("./routes/admin/category.route");
const projectRouter = require("./routes/admin/project.route");
const userRouter = require("./routes/admin/user.route");

const port = process.env.SERVER_PORT;

app.use((req, res, next) => {
  res.locals.requestPath = req.path;
  next();
});
// Set the view engine to EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Middleware to serve static files
app.use(express.static("public"));
app.use(express.static(path.join(__dirname, "public")));

// Static folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Express session middleware
app.use(
  session({
    secret: `${process.env.SESSION_KEY}`,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60 * 60 * 1000, // 1 hour
    },
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Set global variables for flash messages
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});

/**
 * connect to database
 */
// Test the connection
dbAuthenticate();

// pages routes
app.use("/", pagesRouter);
// admin dashboard
app.get(
  "/dashboard",
  ensureAuthenticated,
  checkRole(["admin", "super-admin"]),
  (req, res) => {
    res.render("pages/admin/index");
  }
);

app.use("/dashboard/categories", categoryRouter);
app.use("/dashboard/projects", projectRouter);
app.use("/dashboard/services", serviceRouter);
app.use("/dashboard/testimonials", testimonialRouter);
app.use("/dashboard/users", userRouter);

// app.get(
//   "/dashboard/users",
//   ensureAuthenticated,
//   checkRole(["admin", "super-admin"]),
//   (req, res) => {
//     res.render("pages/admin/users");
//   }
// );
app.use("/", authRoutes);

// 404 route handler
app.use((req, res, next) => {
  res.status(404).render("pages/404", { title: "404 - Page Not Found" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
