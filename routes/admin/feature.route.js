const express = require("express");

const {
  ensureAuthenticated,
} = require("../../config/middleware/is-authenticated.middleware");
const FeaturesController = require("../../controllers/features.controller");
const { uploadImage } = require("../../services/upload.config");
const checkRole = require("../../config/middleware/is-authorized.middle");

const featureRouter = express.Router();
const featuresController = new FeaturesController();

featureRouter.get(
  "/",
  ensureAuthenticated,
  checkRole(["admin", "super-admin"]),
  async (req, res) => {
    const features = await featuresController.getAllFeatures();
    res.render("pages/admin/features", { features });
  }
);

featureRouter.get(
  "/create",
  ensureAuthenticated,
  checkRole(["admin", "super-admin"]),
  async (req, res) => {
    res.render("pages/admin/features/create");
  }
);

featureRouter.post(
  "/create",
  ensureAuthenticated,
  checkRole(["admin", "super-admin"]),
  uploadImage("features").single("imageUrl"),
  async (req, res) => {
    try {
      let featureData = req.body;
      if (req.file) {
        featureData.imageUrl = req.file.filename;
      }
      await featuresController.createFeature(featureData);
      // res.render("pages/admin/features/create");
      res.redirect("/dashboard/features");
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
);

featureRouter.get(
  "/edit/:id",
  ensureAuthenticated,
  checkRole(["admin", "super-admin"]),
  async (req, res) => {
    try {
      const feature = await featuresController.getFeature(req.params.id);
      res.render("pages/admin/features/edit", { feature });
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
);

// Update Feature API
featureRouter.post(
  "/edit/:id",
  ensureAuthenticated,
  checkRole(["admin", "super-admin"]),
  uploadImage("features").single("imageUrl"),
  async (req, res) => {
    try {
      const featureData = req.body;
      if (req.file) {
        featureData.imageUrl = req.file.filename;
      }
      await featuresController.editFeature({
        id: req.params.id,
        ...featureData,
      });
      res.redirect("/dashboard/features");
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
);

// Delete Feature API
featureRouter.post(
  "/delete/:id",
  ensureAuthenticated,
  checkRole(["admin", "super-admin"]),
  async (req, res) => {
    try {
      await featuresController.deleteFeature(req.params.id);
      res.redirect("/dashboard/features");
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
);

module.exports = featureRouter;
