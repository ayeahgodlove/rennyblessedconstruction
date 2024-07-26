const express = require("express");

const {
  ensureAuthenticated,
} = require("../../config/middleware/is-authenticated.middleware");
const VisaCategoriesController = require("../../controllers/visaCategories.controller");
const { uploadFile } = require("../../services/upload.config");

const visaCaetgoryRouter = express.Router();
const visaCategoriesController = new VisaCategoriesController();

visaCaetgoryRouter.get("/", ensureAuthenticated, async (req, res) => {
  const visaCategories = await visaCategoriesController.getAllVisaCategories();
  res.render("pages/admin/visa-categories", { visaCategories });
});

visaCaetgoryRouter.get("/create", ensureAuthenticated, async (req, res) => {
  res.render("pages/admin/visa-categories/create");
});

visaCaetgoryRouter.post(
  "/create",
  ensureAuthenticated,
  uploadFile("visa-categories").single("imageUrl"),
  async (req, res) => {
    try {
      let trainingData = req.body;
      if (req.file) {
        trainingData.imageUrl = req.file.filename;
      }
      await visaCategoriesController.createVisaCategory(trainingData);
      // res.render("pages/admin/visaCategories/create");
      res.redirect("/dashboard/visa-categories");
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
);

visaCaetgoryRouter.get("/edit/:id", ensureAuthenticated, async (req, res) => {
  try {
    const training = await visaCategoriesController.getTraining(req.params.id);
    res.render("pages/admin/visa-categories/edit", { training });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Update Training API
visaCaetgoryRouter.post(
  "/edit/:id",
  ensureAuthenticated,
  uploadFile("visaCategories").single("imageUrl"),
  async (req, res) => {
    try {
      const trainingData = req.body;
      if (req.file) {
        trainingData.imageUrl = req.file.filename;
      }
      await visaCategoriesController.editTraining({ id: req.params.id, ...trainingData });
      res.redirect("/dashboard/visa-categories");
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
);

// Delete Training API
visaCaetgoryRouter.post("/delete/:id", ensureAuthenticated, async (req, res) => {
  try {
    await visaCategoriesController.deleteTraining(req.params.id);
    res.redirect("/dashboard/visa-categories");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = visaCaetgoryRouter;
