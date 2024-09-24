const express = require("express");
const TestimonialsController = require("../controllers/testimonials.controller");
const ServicesController = require("../controllers/service.controller");
const {
  ensureAuthenticated,
} = require("../config/middleware/is-authenticated.middleware");
const checkRole = require("../config/middleware/is-authorized.middle");

const pagesRouter = express.Router();

// models
// const PersonalInformation = require("../models/personal-information");

const { uploadFile } = require("../services/upload.config");

// controllers
const testimonialsController = new TestimonialsController();
const servicesController = new ServicesController();

pagesRouter.get("/", async (req, res) => {
  const testimonials = await testimonialsController.getAllTestimonials();
  const services = await servicesController.getAllServices();

  res.render("pages/index", {
    // services: visaCategories,
    testimonials,
    services,
  });
});

pagesRouter.get("/about-us", async (req, res) => {
  res.render("pages/about", {
    pageTitle: "About Us",
    uri: "About",
  });
});

pagesRouter.get("/projects", async (req, res) => {
  res.render("pages/projects", {
    pageTitle: "Projects",
    uri: "Projects",
  });
});

pagesRouter.get("/contact-us", async (req, res) => {
  res.render("pages/contact", {
    pageTitle: "Contact Us",
    uri: "Contact",
  });
});

pagesRouter.get("/services", async (req, res) => {
  const services = await servicesController.getAllServices();
  res.render("pages/service", {
    pageTitle: "Services",
    uri: "Service",
    services,
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


/**
 * protected user routes
 */
// pagesRouter.get(
//   "/applicant-home",
//   ensureAuthenticated,
//   checkRole(["applicant"]),
//   (req, res) => {
//     res.render("pages/applicant-home");
//   }
// );

module.exports = pagesRouter;
