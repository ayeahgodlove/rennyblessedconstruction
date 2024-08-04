const express = require("express");

const {
  ensureAuthenticated,
} = require("../../config/middleware/is-authenticated.middleware");
const OfficesController = require("../../controllers/offices.controller");
const { uploadImage } = require("../../services/upload.config");
const checkRole = require("../../config/middleware/is-authorized.middle");

const officeRouter = express.Router();
const officesController = new OfficesController();

officeRouter.get(
  "/",
  ensureAuthenticated,
  checkRole(["admin", "super-admin"]),
  async (req, res) => {
    const offices = await officesController.getAllOffices();
    res.render("pages/admin/offices", { offices });
  }
);

officeRouter.get(
  "/create",
  ensureAuthenticated,
  checkRole(["admin", "super-admin"]),
  async (req, res) => {
    res.render("pages/admin/offices/create");
  }
);

officeRouter.post(
  "/create",
  ensureAuthenticated,
  checkRole(["admin", "super-admin"]),
  uploadImage("offices").single("imageUrl"),
  async (req, res) => {
    try {
      let officeData = req.body;
      if (req.file) {
        officeData.imageUrl = req.file.filename;
      }
      await officesController.createOffice(officeData);
      // res.render("pages/admin/offices/create");
      res.redirect("/dashboard/offices");
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
);

officeRouter.get(
  "/edit/:id",
  ensureAuthenticated,
  checkRole(["admin", "super-admin"]),
  async (req, res) => {
    try {
      const office = await officesController.getOffice(req.params.id);
      res.render("pages/admin/offices/edit", { office });
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
);

// Update Office API
officeRouter.post(
  "/edit/:id",
  ensureAuthenticated,
  checkRole(["admin", "super-admin"]),
  uploadImage("offices").single("imageUrl"),
  async (req, res) => {
    try {
      const officeData = req.body;
      if (req.file) {
        officeData.imageUrl = req.file.filename;
      }
      await officesController.editOffice({ id: req.params.id, ...officeData });
      res.redirect("/dashboard/offices");
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
);

// Delete Office API
officeRouter.post(
  "/delete/:id",
  ensureAuthenticated,
  checkRole(["admin", "super-admin"]),
  async (req, res) => {
    try {
      await officesController.deleteOffice(req.params.id);
      res.redirect("/dashboard/offices");
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
);

module.exports = officeRouter;
