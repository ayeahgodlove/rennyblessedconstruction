const express = require("express");
const TestimonialsController = require("../controllers/testimonials.controller");
const TeamsController = require("../controllers/team.controller");
const ServicesController = require("../controllers/service.controller");
const ProjectsController = require("../controllers/project.controller");
const stringLimiter = require("../utils/string");
const stringSlugify = require("../utils/string-slugify");
const deSlugify = require("../utils/string-deslugify");
const {
  ensureAuthenticated,
} = require("../config/middleware/is-authenticated.middleware");
const checkRole = require("../config/middleware/is-authorized.middle");

const pagesRouter = express.Router();

// models
// const PersonalInformation = require("../models/personal-information");

const { uploadFile } = require("../services/upload.config");
const PicturesController = require("../controllers/picture.controller");
const CategoriesController = require("../controllers/category.controller");

// controllers
const testimonialsController = new TestimonialsController();
const teamsController = new TeamsController();
const servicesController = new ServicesController();
const projectsController = new ProjectsController();
const picturesController = new PicturesController();
const categoriesController = new CategoriesController();

pagesRouter.get("/", async (req, res) => {
  const testimonials = await testimonialsController.getAllTestimonials();
  const services = await servicesController.getAllServices();
  const projects = await projectsController.getAllProjects();
  const pictures = await picturesController.getAllPictures();
  const getProject = await projectsController.getProject;

  res.render("pages/index", {
    // services: visaCategories,
    testimonials,
    services,
    projects,
    stringLimiter,
    stringSlugify,
    pictures,
    getProject,
  });
});

pagesRouter.get("/about-us", async (req, res) => {
  const services = await servicesController.getAllServices();
  const teams = await teamsController.getAllTeams();
  const testimonials = await testimonialsController.getAllTestimonials();
  const projects = await projectsController.getAllProjects();

  const teamCount = teams.length;
  const testimonialCount = testimonials.length;
  const projectCount = projects.length;
  res.render("pages/about", {
    pageTitle: "About Us",
    uri: "About",
    services,
    teams,
    testimonials,
    stringLimiter,
    stringSlugify,
    teamCount,
    testimonialCount,
    projectCount,
  });
});

pagesRouter.get("/projects", async (req, res) => {
  const projects = await projectsController.getAllProjects();
  const getProject = await projectsController.getProject;
  const pictures = await picturesController.getAllPictures();
  const services = await servicesController.getAllServices();

  res.render("pages/project", {
    pageTitle: "Projects",
    uri: "Projects",
    projects,
    stringLimiter,
    stringSlugify,
    getProject,
    pictures,
    services,
  });
});

pagesRouter.get("/projects/:slug", async (req, res) => {
  const projects = await projectsController.getAllProjects();
  const { slug } = req.params;
  const title = deSlugify(slug);

  const project = await projectsController.getProjectByTitle(title);
  const pictures = await picturesController.getAllPictures();
  const services = await servicesController.getAllServices();
  const getCategory =  await categoriesController.getCategory;


  const projectPictures =  pictures.filter(p => p.projectId === project.id)

  res.render("pages/project-details", {
    pageTitle: "Projects",
    uri: "Projects",
    projects,
    stringLimiter,
    stringSlugify,
    projectPictures,
    services,
    project,
    getCategory
  });
});

pagesRouter.get("/contact-us", async (req, res) => {
  const services = await servicesController.getAllServices();
  res.render("pages/contact", {
    pageTitle: "Contact Us",
    uri: "Contact",
    services,
    stringLimiter,
    stringSlugify,
  });
});

pagesRouter.get("/services", async (req, res) => {
  const services = await servicesController.getAllServices();
  const testimonials = await testimonialsController.getAllTestimonials();
  res.render("pages/services", {
    pageTitle: "Services",
    uri: "Service",
    services,
    testimonials,
    stringLimiter,
    stringSlugify,
  });
});

pagesRouter.get("/services/:slug", async (req, res) => {
  const { slug } = req.params;
  const title = deSlugify(slug);
  const services = await servicesController.getAllServices();
  const service = await servicesController.getServiceByTitle(title);
  const testimonials = await testimonialsController.getAllTestimonials();

  res.render("pages/service-details", {
    pageTitle: "Services",
    uri: "Service",
    services,
    testimonials,
    service,
    stringLimiter,
    stringSlugify,
  });
});

pagesRouter.get("/testimonials", async (req, res) => {
  const testimonials = await testimonialsController.getAllTestimonials();
  const services = await servicesController.getAllServices();
  res.render("pages/testimony", {
    pageTitle: "Testimonials",
    uri: "Testimonial",
    testimonials,
    services,
    stringLimiter,
    stringSlugify,
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
