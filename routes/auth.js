const bcryptjs = require("bcryptjs");
const express = require("express");
const passport = require("passport");
const User = require("../models/user");
const router = express.Router();

// Login Route
router.get("/login", (req, res) => {
  res.render("login");
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
  })
);

// Register Route
router.get("/register", (req, res) => {
  res.render("register");
});

router.post("/register", async (req, res) => {
  const { name, email, username, password, role } = req.body;
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
    res.redirect("/register");
  }
});

// Logout Route
router.get("/logout", (req, res) => {
  req.logout();
  req.flash("success_msg", "You are logged out");
  res.redirect("/login");
});

module.exports = router;
