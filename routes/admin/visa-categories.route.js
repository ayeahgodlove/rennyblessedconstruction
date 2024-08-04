const express = require("express");

const {
  ensureAuthenticated,
} = require("../../config/middleware/is-authenticated.middleware");
const VisaCategoriesController = require("../../controllers/visaCategories.controller");
const { uploadImage } = require("../../services/upload.config");
const checkRole = require("../../config/middleware/is-authorized.middle");

const visaCaetgoryRouter = express.Router();
const visaCategoriesController = new VisaCategoriesController();

visaCaetgoryRouter.get(
  "/",
  ensureAuthenticated,
  checkRole(["admin", "super-admin"]),
  async (req, res) => {
    const visaCategories =
      await visaCategoriesController.getAllVisaCategories();
    res.render("pages/admin/visa-categories", { visaCategories });
  }
);

visaCaetgoryRouter.get(
  "/create",
  ensureAuthenticated,
  checkRole(["admin", "super-admin"]),
  async (req, res) => {
    res.render("pages/admin/visa-categories/create");
  }
);

visaCaetgoryRouter.post(
  "/create",
  ensureAuthenticated,
  checkRole(["admin", "super-admin"]),
  uploadImage("visa-categories").single("imageUrl"),
  async (req, res) => {
    try {
      let visaCategoryData = req.body;
      if (req.file) {
        visaCategoryData.imageUrl = req.file.filename;
      }
      await visaCategoriesController.createVisaCategory(visaCategoryData);
      // res.render("pages/admin/visaCategories/create");
      res.redirect("/dashboard/visa-categories");
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
);

visaCaetgoryRouter.get(
  "/edit/:id",
  ensureAuthenticated,
  checkRole(["admin", "super-admin"]),
  async (req, res) => {
    try {
      const visaCategory = await visaCategoriesController.getVisaCategory(
        req.params.id
      );
      res.render("pages/admin/visa-categories/edit", { visaCategory });
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
);

// Update VisaCategory API
visaCaetgoryRouter.post(
  "/edit/:id",
  ensureAuthenticated,
  checkRole(["admin", "super-admin"]),
  uploadImage("visaCategories").single("imageUrl"),
  async (req, res) => {
    try {
      const visaCategoryData = req.body;
      if (req.file) {
        visaCategoryData.imageUrl = req.file.filename;
      }
      await visaCategoriesController.editVisaCategory({
        id: req.params.id,
        ...visaCategoryData,
      });
      res.redirect("/dashboard/visa-categories");
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
);

// Delete VisaCategory API
visaCaetgoryRouter.post(
  "/delete/:id",
  ensureAuthenticated,
  checkRole(["admin", "super-admin"]),
  async (req, res) => {
    try {
      await visaCategoriesController.deleteVisaCategory(req.params.id);
      res.redirect("/dashboard/visa-categories");
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
);

module.exports = visaCaetgoryRouter;
