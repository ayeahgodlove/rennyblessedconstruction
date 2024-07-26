const express = require("express");

const {
  ensureAuthenticated,
} = require("../../config/middleware/is-authenticated.middleware");
const OfficesController = require("../../controllers/offices.controller");
const { uploadFile } = require("../../services/upload.config");

const officeRouter = express.Router();
const officesController = new OfficesController();

officeRouter.get("/", ensureAuthenticated, async (req, res) => {
  const offices = await officesController.getAllOffices();
  res.render("pages/admin/offices", { offices });
});

officeRouter.get("/create", ensureAuthenticated, async (req, res) => {
  res.render("pages/admin/offices/create");
});

officeRouter.post(
  "/create",
  ensureAuthenticated,
  uploadFile("offices").single("imageUrl"),
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

officeRouter.get("/edit/:id", ensureAuthenticated, async (req, res) => {
  try {
    const office = await officesController.getOffice(req.params.id);
    res.render("pages/admin/offices/edit", { office });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Update Office API
officeRouter.post(
  "/edit/:id",
  ensureAuthenticated,
  uploadFile("offices").single("imageUrl"),
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
officeRouter.post("/delete/:id", ensureAuthenticated, async (req, res) => {
  try {
    await officesController.deleteOffice(req.params.id);
    res.redirect("/dashboard/offices");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = officeRouter;
