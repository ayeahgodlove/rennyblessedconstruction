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
  // passport.authenticate("local", {
  //   successRedirect: "/dashboard",
  //   failureRedirect: "/login",
  //   failureFlash: true,
  //   successFlash: "Login successful",
  // })(req, res, next);

  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.redirect("/login");
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }

      // Flash message
      req.flash("success_msg", "Login successful");

      // Redirect based on role
      if (user.role === "admin" || user.role === "super-admin") {
        return res.redirect("/dashboard");
      } else if (user.role === "applicant") {
        return res.redirect("/applicant-home");
      } else {
        return res.redirect("/login");
      }
    });
  })(req, res, next);
});

// Register Route
router.get("/register", (req, res) => {
  res.render("register");
});

router.post("/register", async (req, res) => {
  const { fullName, email, username, password, confirmPassword } = req.body;
  let errors = [];

  if (!username || !password || !email || !fullName) {
    errors.push({ msg: "Please enter all fields" });
  }

  if (password.length < 6) {
    errors.push({ msg: "Password must be at least 6 characters" });
  }

  if (password !== confirmPassword) {
    errors.push({ msg: "The two passwords must be the same" });
  }

  if (errors.length > 0) {
    res.render("register", {
      errors,
      username,
      password,
      fullName,
      email,
    });
  } else {
    try {
      const hashedPassword = await bcryptjs.hash(password, 10);
      await User.create({
        fullName,
        email,
        username,
        password: hashedPassword,
        role: "applicant",
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
        fullName,
        email,
      });
    }
  }
});

// Logout Route
router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success_msg", "You are logged out");
    res.redirect("/login");
  });
});

module.exports = router;
