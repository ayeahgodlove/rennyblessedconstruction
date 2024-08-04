const express = require("express");

const {
  ensureAuthenticated,
} = require("../../config/middleware/is-authenticated.middleware");
const VisaApplicationsController = require("../../controllers/visaApplications.controller");
const checkRole = require("../../config/middleware/is-authorized.middle");

const visaApplicationRouter = express.Router();
const visaApplicationsController = new VisaApplicationsController();

visaApplicationRouter.get(
  "/",
  ensureAuthenticated,
  checkRole(["admin", "super-admin", "officer"]),
  async (req, res) => {
    const visaApplications =
      await visaApplicationsController.getAllVisaApplications();
    res.render("pages/admin/visa-applications", { visaApplications });
  }
);

visaApplicationRouter.get(
  "/edit/:id",
  ensureAuthenticated,
  checkRole(["admin", "super-admin", "officer"]),
  async (req, res) => {
    try {
      const visaApplication =
        await visaApplicationsController.getVisaApplication(req.params.id);
      res.render("pages/admin/visa-applications/edit", { visaApplication });
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
);

// Update VisaApplicavisaApplication API
visaApplicationRouter.post(
  "/edit/:id",
  ensureAuthenticated,
  checkRole(["admin", "super-admin", "officer"]),
  async (req, res) => {
    const reviewDate = Date.now();
    try {
      await visaApplicationsController.editVisaApplication({
        id: req.params.id,
        ...req.body,
        reviewDate,
      });
      res.redirect("/dashboard/visa-applications");
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
);

// Delete VisaApplicavisaApplication API
visaApplicationRouter.post(
  "/delete/:id",
  ensureAuthenticated,
  checkRole(["admin", "super-admin"]),
  async (req, res) => {
    try {
      await visaApplicationsController.deleteVisaApplication(req.params.id);
      res.redirect("/dashboard/visa-applications");
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
);

module.exports = visaApplicationRouter;
