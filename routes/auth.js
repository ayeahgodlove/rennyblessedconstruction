const bcryptjs = require("bcryptjs");
const express = require("express");
const passport = require("passport");
const User = require("../models/user");
const router = express.Router();

// Login Route
router.get("/login", (req, res) => {
  res.render("login");
});

router.post("/login", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/login",
    failureFlash: true,
  })(req, res, next);
});

// Register Route
router.get("/register", (req, res) => {
  res.render("register");
});

router.post("/register", async (req, res) => {
  const { name, email, username, password, role } = req.body;
  let errors = [];

  if (!username || !password || !email || !name) {
    errors.push({ msg: "Please enter all fields" });
  }

  if (password.length < 6) {
    errors.push({ msg: "Password must be at least 6 characters" });
  }

  if (errors.length > 0) {
    res.render("register", {
      errors,
      username,
      password,
      name,
      email
    });
  } else {
    try {
      const hashedPassword = await bcryptjs.hash(password, 10);
      await User.create({
        name,
        email,
        username,
        password: hashedPassword,
        role,
      });
      req.flash("success_msg", "You are now registered and can log in");
      res.redirect("/login");
    } catch (error) {
      console.error(error);
      req.flash("error_msg", "Registration failed");
      // res.redirect("/register");
      res.render("register", {
        errors: [{ msg: "An error occurred" }],
        username,
        password,
        name,
        email,
      });
    }
  }
});

// Logout Route
router.get('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) { return next(err); }
    req.flash('success_msg', 'You are logged out');
    res.redirect('/login');
  });
});

module.exports = router;
