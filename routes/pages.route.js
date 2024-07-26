const express = require("express");
const VisaCategoriesController = require("../controllers/visaCategories.controller");
const OfficesController = require("../controllers/offices.controller");
const TrainingsController = require("../controllers/trainings.controller");
const CountriesController = require("../controllers/countries.controller");
const TestimonialsController = require("../controllers/testimonials.controller");
const FeaturesController = require("../controllers/features.controller");
const {
  ensureAuthenticated,
} = require("../config/middleware/is-authenticated.middleware");
const checkRole = require("../config/middleware/is-authorized.middle");

const pagesRouter = express.Router();

const visaCategoriesController = new VisaCategoriesController();
const officesController = new OfficesController();
const trainingsController = new TrainingsController();
const countriesController = new CountriesController();
const testimonialsController = new TestimonialsController();
const featuresController = new FeaturesController();

pagesRouter.get("/", async (req, res) => {
  const visaCategories = await visaCategoriesController.getAllVisaCategories();
  const offices = await officesController.getAllOffices();
  const trainings = await trainingsController.getAllTrainings();
  const countries = await countriesController.getAllCountries();
  const testimonials = await testimonialsController.getAllTestimonials();
  const features = await featuresController.getAllFeatures();

  res.render("pages/index", {
    services: visaCategories,
    offices,
    trainings,
    countries,
    testimonials,
    features,
  });
});

pagesRouter.get("/about-us", async (req, res) => {
  const trainings = await trainingsController.getAllTrainings();
  const countries = await countriesController.getAllCountries();
  res.render("pages/about", {
    pageTitle: "About Us",
    uri: "About",
    trainings,
    countries,
  });
});
pagesRouter.get("/services", async (req, res) => {
  const visaCategories = await visaCategoriesController.getAllVisaCategories();
  const trainings = await trainingsController.getAllTrainings();
  const countries = await countriesController.getAllCountries();

  res.render("pages/services", {
    pageTitle: "Services",
    uri: "Services",
    services: visaCategories,
    trainings,
    countries,
  });
});
pagesRouter.get("/contact-us", async (req, res) => {
  const offices = await officesController.getAllOffices();
  res.render("pages/contact", {
    pageTitle: "Contact Us",
    uri: "Contact",
    offices,
  });
});

pagesRouter.get("/features", async (req, res) => {
  const features = await featuresController.getAllFeatures();
  const countries = await countriesController.getAllCountries();
  res.render("pages/feature", {
    pageTitle: "Features",
    uri: "Feature",
    features,
    countries,
  });
});
pagesRouter.get("/countries", async (req, res) => {
  const countries = await countriesController.getAllCountries();
  const trainings = await trainingsController.getAllTrainings();
  res.render("pages/country", {
    pageTitle: "Countries",
    uri: "Country",
    countries,
    trainings,
  });
});
pagesRouter.get("/testimonials", async (req, res) => {
  const testimonials = await testimonialsController.getAllTestimonials();
  res.render("pages/testimony", {
    pageTitle: "Testimonials",
    uri: "Testimonial",
    testimonials,
  });
});
pagesRouter.get("/trainings", async (req, res) => {
  const countries = await countriesController.getAllCountries();
  const trainings = await trainingsController.getAllTrainings();
  res.render("pages/training", {
    pageTitle: "Trainings",
    uri: "Training",
    countries,
    trainings,
  });
});

// visa application page
pagesRouter.get("/visa-application", async (req, res) => {
  const offices = await officesController.getAllOffices();

  res.render("pages/visa-application", {
    pageTitle: "Services",
    uri: "Services",
    offices,
  });
});

// Protect user routes
pagesRouter.get(
  "/applicant-home",
  ensureAuthenticated,
  checkRole(["applicant"]),
  (req, res) => {
    res.render("pages/applicant-home");
  }
);


pagesRouter.get(
  "/visa-application/apply",
  ensureAuthenticated,
  checkRole(["applicant"]),
  async (req, res) => {
    res.render("pages/404");
  }
);

module.exports = pagesRouter;
