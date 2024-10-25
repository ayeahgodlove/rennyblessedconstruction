const express = require("express");

const {
  ensureAuthenticated,
} = require("../../config/middleware/is-authenticated.middleware");
const UsersController = require("../../controllers/users.controller");
const checkRole = require("../../config/middleware/is-authorized.middle");

const userRouter = express.Router();
const usersController = new UsersController();

userRouter.get(
  "/",
  ensureAuthenticated,
  checkRole(["admin", "super-admin"]),
  async (req, res) => {
    const users = await usersController.getAllUsers();
    res.render("pages/admin/users", { users });
  }
);

// userRouter.get(
//   "/create",
//   ensureAuthenticated,
//   checkRole(["admin", "super-admin"]),
//   async (req, res) => {
//     res.render("pages/admin/users/create");
//   }
// );

// userRouter.post(
//   "/create",
//   ensureAuthenticated,
//   checkRole(["admin", "super-admin"]),
//   // uploadImage("users").single("imageUrl"),
//   async (req, res) => {
//     try {
//       let userData = req.body;
//       await usersController.createUser(userData);
//       // res.render("pages/admin/users/create");
//       res.redirect("/dashboard/users");
//     } catch (error) {
//       res.status(500).send(error.message);
//     }
//   }
// );

// userRouter.get(
//   "/edit/:id",
//   ensureAuthenticated,
//   checkRole(["admin", "super-admin"]),
//   async (req, res) => {
//     try {
//       const user = await usersController.getUser(req.params.id);
//       res.render("pages/admin/users/edit", { user });
//     } catch (error) {
//       res.status(500).send(error.message);
//     }
//   }
// );

// // Update User API
// userRouter.post(
//   "/edit/:id",
//   ensureAuthenticated,
//   checkRole(["admin", "super-admin"]),
//   // uploadImage("users").single("imageUrl"),
//   async (req, res) => {
//     try {
//       const userData = req.body;
//       await usersController.editUser({
//         id: req.params.id,
//         ...userData,
//       });
//       res.redirect("/dashboard/users");
//     } catch (error) {
//       res.status(500).send(error.message);
//     }
//   }
// );

// // Delete User API
// userRouter.post(
//   "/delete/:id",
//   ensureAuthenticated,
//   checkRole(["admin", "super-admin"]),
//   async (req, res) => {
//     try {
//       await usersController.deleteUser(req.params.id);
//       res.redirect("/dashboard/users");
//     } catch (error) {
//       res.status(500).send(error.message);
//     }
//   }
// );

module.exports = userRouter;
