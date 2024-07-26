const express = require("express");
const VisaCategoriesController = require("../controllers/visaCategories.controller");
const OfficesController = require("../controllers/offices.controller");
const TrainingsController = require("../controllers/trainings.controller");
const CountriesController = require("../controllers/countries.controller");
const TestimonialsController = require("../controllers/testimonials.controller");
const FeaturesController = require("../controllers/features.controller");

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

// Route to render the pages routes
pagesRouter.get("/", (req, res) => {
  res.render("pages/index");
});
pagesRouter.get("/about-us", (req, res) => {
  res.render("pages/about", { pageTitle: "About Us", uri: "About" });
});
pagesRouter.get("/services", (req, res) => {
  res.render("pages/services", { pageTitle: "Services", uri: "Services" });
});
pagesRouter.get("/contact-us", (req, res) => {
  res.render("pages/contact", { pageTitle: "Contact Us", uri: "Contact" });
});

pagesRouter.get("/features", (req, res) => {
  res.render("pages/feature", { pageTitle: "Features", uri: "Feature" });
});
pagesRouter.get("/countries", (req, res) => {
  res.render("pages/country", { pageTitle: "Countries", uri: "Country" });
});
pagesRouter.get("/testimonials", (req, res) => {
  res.render("pages/testimony", {
    pageTitle: "Testimonials",
    uri: "Testimonial",
  });
});
pagesRouter.get("/trainings", (req, res) => {
  res.render("pages/training", { pageTitle: "Trainings", uri: "Training" });
});

module.exports = pagesRouter;
