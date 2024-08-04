const express = require("express");

const {
  ensureAuthenticated,
} = require("../../config/middleware/is-authenticated.middleware");
const TrainingsController = require("../../controllers/trainings.controller");
const { uploadImage } = require("../../services/upload.config");
const checkRole = require("../../config/middleware/is-authorized.middle");

const trainingRouter = express.Router();
const trainingsController = new TrainingsController();

trainingRouter.get(
  "/",
  ensureAuthenticated,
  checkRole(["admin", "super-admin"]),
  async (req, res) => {
    const trainings = await trainingsController.getAllTrainings();
    res.render("pages/admin/trainings", { trainings });
  }
);

trainingRouter.get(
  "/create",
  ensureAuthenticated,
  checkRole(["admin", "super-admin"]),
  async (req, res) => {
    res.render("pages/admin/trainings/create");
  }
);

trainingRouter.post(
  "/create",
  ensureAuthenticated,
  checkRole(["admin", "super-admin"]),
  uploadImage("trainings").single("imageUrl"),
  async (req, res) => {
    try {
      let trainingData = req.body;
      if (req.file) {
        trainingData.imageUrl = req.file.filename;
      }
      await trainingsController.createTraining(trainingData);
      // res.render("pages/admin/trainings/create");
      res.redirect("/dashboard/trainings");
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
);

trainingRouter.get(
  "/edit/:id",
  ensureAuthenticated,
  checkRole(["admin", "super-admin"]),
  async (req, res) => {
    try {
      const training = await trainingsController.getTraining(req.params.id);
      res.render("pages/admin/trainings/edit", { training });
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
);

// Update Training API
trainingRouter.post(
  "/edit/:id",
  ensureAuthenticated,
  checkRole(["admin", "super-admin"]),
  uploadImage("trainings").single("imageUrl"),
  async (req, res) => {
    try {
      const trainingData = req.body;
      if (req.file) {
        trainingData.imageUrl = req.file.filename;
      }
      await trainingsController.editTraining({
        id: req.params.id,
        ...trainingData,
      });
      res.redirect("/dashboard/trainings");
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
);

// Delete Training API
trainingRouter.post(
  "/delete/:id",
  ensureAuthenticated,
  checkRole(["admin", "super-admin"]),
  async (req, res) => {
    try {
      await trainingsController.deleteTraining(req.params.id);
      res.redirect("/dashboard/trainings");
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
);

module.exports = trainingRouter;
