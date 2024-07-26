const express = require("express");

const {
  ensureAuthenticated,
} = require("../config/middleware/is-authenticated.middleware");
const CountriesController = require("../controllers/countries.controller");
const { uploadFile } = require("../services/upload.config");

const countryRouter = express.Router();
const countriesController = new CountriesController();

countryRouter.get("/", ensureAuthenticated, async (req, res) => {
  const countries = await countriesController.getAllCountries();
  res.render("pages/admin/countries", { countries });
});

countryRouter.get("/create", ensureAuthenticated, async (req, res) => {
  res.render("pages/admin/countries/create");
});

countryRouter.post(
  "/create",
  ensureAuthenticated,
  uploadFile("countries").single("imageUrl"),
  async (req, res) => {
    try {
      let countryData = req.body;
      if (req.files) {
        countryData.imageUrl = req.files[0].filename;
        countryData.flagUrl = req.files[0].filename;
      }
      await countriesController.createCountry(countryData);
      // res.render("pages/admin/countries/create");
      res.redirect("/dashboard/countries");
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
);

countryRouter.get("/edit/:id", ensureAuthenticated, async (req, res) => {
  try {
    const country = await countriesController.getCountry(req.params.id);
    res.render("pages/admin/countries/edit", { country });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Update Country API
countryRouter.post(
  "/edit/:id",
  ensureAuthenticated,
  uploadFile("countries").single("imageUrl"),
  async (req, res) => {
    try {
      const countryData = req.body;
      if (req.file) {
        countryData.imageUrl = req.file.filename;
      }
      await countriesController.editCountry({ id: req.params.id, ...countryData });
      res.redirect("/dashboard/countries");
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
);

// Delete Country API
countryRouter.post("/delete/:id", ensureAuthenticated, async (req, res) => {
  try {
    await countriesController.deleteCountry(req.params.id);
    res.redirect("/dashboard/countries");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = countryRouter;
