const express = require("express");

const {
  ensureAuthenticated,
} = require("../../config/middleware/is-authenticated.middleware");
const ServicesController = require("../../controllers/service.controller");
const { uploadImage } = require("../../services/upload.config");
const checkRole = require("../../config/middleware/is-authorized.middle");

const serviceRouter = express.Router();
const servicesController = new ServicesController();

serviceRouter.get(
  "/",
  ensureAuthenticated,
  checkRole(["admin", "super-admin"]),
  async (req, res) => {
    const services = await servicesController.getAllServices();
    res.render("pages/admin/services", { services });
  }
);

serviceRouter.get(
  "/create",
  ensureAuthenticated,
  checkRole(["admin", "super-admin"]),
  async (req, res) => {
    res.render("pages/admin/services/create");
  }
);

serviceRouter.post(
  "/create",
  ensureAuthenticated,
  checkRole(["admin", "super-admin"]),
  uploadImage("services").single("imageUrl"),
  async (req, res) => {
    try {
      let serviceData = req.body;
      if (req.file) {
        serviceData.imageUrl = req.file.filename;
      }
      await servicesController.createService(serviceData);
      // res.render("pages/admin/services/create");
      res.redirect("/dashboard/services");
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
);

serviceRouter.get(
  "/edit/:id",
  ensureAuthenticated,
  checkRole(["admin", "super-admin"]),
  async (req, res) => {
    try {
      const service = await servicesController.getService(req.params.id);
      res.render("pages/admin/services/edit", { service });
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
);

// Update Service API
serviceRouter.post(
  "/edit/:id",
  ensureAuthenticated,
  checkRole(["admin", "super-admin"]),
  uploadImage("services").single("imageUrl"),
  async (req, res) => {
    try {
      const serviceData = req.body;
      if (req.file) {
        serviceData.imageUrl = req.file.filename;
      }
      await servicesController.editService({
        id: req.params.id,
        ...serviceData,
      });
      res.redirect("/dashboard/services");
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
);

// Delete Service API
serviceRouter.post(
  "/delete/:id",
  ensureAuthenticated,
  checkRole(["admin", "super-admin"]),
  async (req, res) => {
    try {
      await servicesController.deleteService(req.params.id);
      res.redirect("/dashboard/services");
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
);

module.exports = serviceRouter;
