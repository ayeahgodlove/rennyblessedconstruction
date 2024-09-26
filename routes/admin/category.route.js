const express = require("express");

const {
  ensureAuthenticated,
} = require("../../config/middleware/is-authenticated.middleware");
const CategoriesController = require("../../controllers/category.controller");
const checkRole = require("../../config/middleware/is-authorized.middle");

const categoryRouter = express.Router();
const categoriesController = new CategoriesController();

categoryRouter.get(
  "/",
  ensureAuthenticated,
  checkRole(["admin", "super-admin"]),
  async (req, res) => {
    const categories = await categoriesController.getAllCategories();
    res.render("pages/admin/categories", { categories });
  }
);

categoryRouter.get(
  "/create",
  ensureAuthenticated,
  checkRole(["admin", "super-admin"]),
  async (req, res) => {
    res.render("pages/admin/categories/create");
  }
);

categoryRouter.post(
  "/create",
  ensureAuthenticated,
  checkRole(["admin", "super-admin"]),
  // uploadImage("categories").single("imageUrl"),
  async (req, res) => {
    try {
      let categoryData = req.body;
      await categoriesController.createCategory(categoryData);
      // res.render("pages/admin/categories/create");
      res.redirect("/dashboard/categories");
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
);

categoryRouter.get(
  "/edit/:id",
  ensureAuthenticated,
  checkRole(["admin", "super-admin"]),
  async (req, res) => {
    try {
      const category = await categoriesController.getCategory(req.params.id);
      res.render("pages/admin/categories/edit", { category });
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
);

// Update Category API
categoryRouter.post(
  "/edit/:id",
  ensureAuthenticated,
  checkRole(["admin", "super-admin"]),
  // uploadImage("categories").single("imageUrl"),
  async (req, res) => {
    try {
      const categoryData = req.body;
      await categoriesController.editCategory({
        id: req.params.id,
        ...categoryData,
      });
      res.redirect("/dashboard/categories");
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
);

// Delete Category API
categoryRouter.post(
  "/delete/:id",
  ensureAuthenticated,
  checkRole(["admin", "super-admin"]),
  async (req, res) => {
    try {
      await categoriesController.deleteCategory(req.params.id);
      res.redirect("/dashboard/categories");
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
);

module.exports = categoryRouter;
