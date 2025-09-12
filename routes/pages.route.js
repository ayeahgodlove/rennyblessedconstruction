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
    title: "RB Construction & Engineering - Professional Construction Services in Cameroon",
    description: "RB Construction & Engineering Associate offers comprehensive construction, engineering, and project management services in Cameroon. Quality craftsmanship, innovative solutions, and reliable project delivery.",
    keywords: "construction Cameroon, engineering services, building contractors, project management, architectural design, structural engineering, Bamenda construction, construction company Cameroon",
    canonical: "https://rbconstruction.com",
    ogTitle: "RB Construction & Engineering - Building Dreams, Creating Futures",
    ogDescription: "Professional construction and engineering services in Cameroon. From architectural design to project completion, we deliver excellence in every project.",
    ogImage: "https://rbconstruction.com/assets/img/hero-carousel/hero-carousel-1.jpg",
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
    title: "About RB Construction & Engineering - Our Story & Team",
    description: "Learn about RB Construction & Engineering Associate's journey from humble beginnings to becoming a trusted construction and engineering company in Cameroon. Meet our expert team.",
    keywords: "about RB construction, construction company Cameroon, engineering team, construction history, Bamenda contractors, construction team, engineering professionals",
    canonical: "https://rbconstruction.com/about-us",
    ogTitle: "About RB Construction & Engineering - Building Excellence Since Day One",
    ogDescription: "Discover our story, values, and the dedicated team behind RB Construction's success in delivering quality construction projects across Cameroon.",
    ogImage: "https://rbconstruction.com/assets/img/about.jpg",
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
    title: "Our Construction Projects - RB Construction Portfolio",
    description: "Explore RB Construction's impressive portfolio of completed construction and engineering projects across Cameroon. See our commitment to quality and innovation.",
    keywords: "construction projects Cameroon, building portfolio, completed projects, construction gallery, engineering projects Bamenda, construction showcase",
    canonical: "https://rbconstruction.com/projects",
    ogTitle: "RB Construction Projects - Showcasing Excellence in Construction",
    ogDescription: "Browse our portfolio of successful construction and engineering projects that demonstrate our expertise and commitment to quality in Cameroon.",
    ogImage: "https://rbconstruction.com/assets/img/projects-dir/IMG_20221028_163043_993.jpg",
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
    title: "Contact RB Construction & Engineering - Get Your Free Quote",
    description: "Contact RB Construction & Engineering Associate for your construction and engineering needs. Located in Nkwen, Bamenda, Cameroon. Get your free quote today.",
    keywords: "contact construction company, construction quote Cameroon, engineering consultation, Bamenda contractors, construction services contact, construction inquiry",
    canonical: "https://rbconstruction.com/contact-us",
    ogTitle: "Contact RB Construction - Get Your Free Construction Quote",
    ogDescription: "Ready to start your construction project? Contact RB Construction for professional engineering and construction services in Cameroon. Free consultation available.",
    ogImage: "https://rbconstruction.com/assets/img/contact-bg.jpg",
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
    title: "Construction Services - RB Construction & Engineering Solutions",
    description: "RB Construction offers comprehensive construction and engineering services in Cameroon including architectural design, structural engineering, project management, and building construction.",
    keywords: "construction services Cameroon, engineering services, architectural design, structural engineering, project management, building construction, Bamenda contractors, construction solutions",
    canonical: "https://rbconstruction.com/services",
    ogTitle: "RB Construction Services - Comprehensive Engineering Solutions",
    ogDescription: "Professional construction and engineering services in Cameroon. From architectural design to project completion, we provide end-to-end construction solutions.",
    ogImage: "https://rbconstruction.com/assets/img/services/service-1.jpg",
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

  console.log("title: ", title)
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
