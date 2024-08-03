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

// personal information
pagesRouter.get(
  "/apply-personal-information",
  ensureAuthenticated,
  checkRole(["applicant"]),
  async (req, res) => {
    res.render("pages/forms/personal-information");
  }
);

pagesRouter.post(
  "/apply-personal-information",
  ensureAuthenticated,
  checkRole(["applicant"]),
  async (req, res) => {
    req.session.personalInfo = req.body;
    res.redirect("/apply-travel-information");
  }
);

// travel-information
pagesRouter.get(
  "/apply-travel-information",
  ensureAuthenticated,
  checkRole(["applicant"]),
  async (req, res) => {
    console.log(req.session.personalInfo);
    res.render("pages/forms/travel-information");
  }
);

pagesRouter.post(
  "/apply-travel-information",
  ensureAuthenticated,
  checkRole(["applicant"]),
  async (req, res) => {
    req.session.travelInfo = req.body;
    res.redirect("/apply-employment-information");
  }
);

// employment information
pagesRouter.get(
  "/apply-employment-information",
  ensureAuthenticated,
  checkRole(["applicant"]),
  async (req, res) => {
    console.log(req.session.personalInfo, req.session.travelInfo);
    res.render("pages/forms/employment-information");
  }
);

pagesRouter.post(
  "/apply-employment-information",
  ensureAuthenticated,
  checkRole(["applicant"]),
  async (req, res) => {
    req.session.employmentInfo = req.body;
    // Redirect to a confirmation page or another route
    res.redirect("/apply-financial-information");
  }
);

// financial information
pagesRouter.get(
  "/apply-financial-information",
  ensureAuthenticated,
  checkRole(["applicant"]),
  async (req, res) => {
    res.render("pages/forms/financial-information");
  }
);

pagesRouter.post(
  "/apply-financial-information",
  ensureAuthenticated,
  checkRole(["applicant"]),
  async (req, res) => {
    req.session.financialInformation = req.body;
    // Redirect to a confirmation page or another route
    res.redirect("/apply-travel-history-information");
  }
);

// previos travel information
pagesRouter.get(
  "/apply-travel-history-information",
  ensureAuthenticated,
  checkRole(["applicant"]),
  async (req, res) => {
    res.render("pages/forms/travel-history-information");
  }
);

pagesRouter.post(
  "/apply-travel-history",
  ensureAuthenticated,
  checkRole(["applicant"]),
  async (req, res) => {
    req.session.travelHistory = req.body;
    // Redirect to a confirmation page or another route
    res.redirect("/apply-health-information");
  }
);

// Health  information
pagesRouter.get(
  "/apply-health-information",
  ensureAuthenticated,
  checkRole(["applicant"]),
  async (req, res) => {
    res.render("pages/forms/health-information");
  }
);

pagesRouter.post(
  "/apply-health-information",
  ensureAuthenticated,
  checkRole(["applicant"]),
  async (req, res) => {
    req.session.healthInformation = req.body;
    // Redirect to a confirmation page or another route
    res.redirect("/apply-supporting-documents");
  }
);

// Supporting Documents
pagesRouter.get(
  "/apply-supporting-documents",
  ensureAuthenticated,
  checkRole(["applicant"]),
  async (req, res) => {
    res.render("pages/forms/supporting-document");
  }
);

pagesRouter.post(
  "/apply-supporting-documents",
  ensureAuthenticated,
  checkRole(["applicant"]),
  async (req, res) => {
    req.session.supportingDocuments = req.body;
    // Redirect to a confirmation page or another route
    res.redirect("/apply-security-information");
  }
);

// Security Informatino
pagesRouter.get(
  "/apply-security-information",
  ensureAuthenticated,
  checkRole(["applicant"]),
  async (req, res) => {
    res.render("pages/forms/security-information");
  }
);

pagesRouter.post(
  "/apply-security-information",
  ensureAuthenticated,
  checkRole(["applicant"]),
  async (req, res) => {
    req.session.securityInformation = req.body;
    // Redirect to a confirmation page or another route
    res.redirect("/apply-digital-signature");
  }
);


// digital information
pagesRouter.get(
  "/apply-digital-signature",
  ensureAuthenticated,
  checkRole(["applicant"]),
  async (req, res) => {
    res.render("pages/forms/digital-signature");
  }
);

pagesRouter.post(
  "/apply-digital-signature",
  ensureAuthenticated,
  checkRole(["applicant"]),
  async (req, res) => {
    req.session.digitalSignature = req.body;
    // Redirect to a confirmation page or another route
    res.redirect("/apply-confirmation");
  }
);


// Example confirmation route
pagesRouter.get(
  "/apply-confirmation",
  ensureAuthenticated,
  checkRole(["applicant"]),
  async (req, res) => {
    // Combine session data or render confirmation page
    const {
      personalInfo,
      travelInfo,
      employmentInfo,
      financialInformation,
      travelHistory,
      healthInformation,
      securityInformation,
      supportingDocuments
    } = req.session;
    console.log(
      personalInfo,
      travelInfo,
      employmentInfo,
      financialInformation,
      travelHistory,
      healthInformation,
      securityInformation,
      supportingDocuments
    );

    res.render("pages/forms/confirmation", {
      personalInfo,
      travelInfo,
      employmentInfo,
    });
  }
);

module.exports = pagesRouter;
