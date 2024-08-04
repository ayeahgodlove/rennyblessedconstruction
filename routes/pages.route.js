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

// models
const PersonalInformation = require("../models/personal-information");
const TravelInformation = require("../models/travel-information");
const HealthInformation = require("../models/health-information");
const FinancialInformation = require("../models/financial-information");
const EmploymentInformation = require("../models/employment-information");
const SecurityInformation = require("../models/security-information");
const SupporttingInformation = require("../models/support-document");
const TravelHistoryInformation = require("../models/travel-history-information");
const DigitalSignature = require("../models/digital-signature");
const { uploadFile } = require("../services/upload.config");

// controllers
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
  async (req, res, next) => {
    try {
      const personalInfo = await PersonalInformation.findOne({
        where: {
          userId: req.user.id,
        },
      });

      if (!personalInfo) {
        res.render("pages/forms/personal-information", { personalInfo: {} });
      } else {
        res.render("pages/forms/personal-information", { personalInfo });
      }
    } catch (error) {
      next(error);
    }
  }
);

pagesRouter.post(
  "/apply-personal-information",
  ensureAuthenticated,
  checkRole(["applicant"]),
  async (req, res) => {
    const userId = req.user.id;
    const { email, phone, fullName, passportNumber } = req.body;
    try {
      const existingPersonalInfo = await PersonalInformation.findOne({
        where: {
          userId: userId,
          email,
          phone,
          passportNumber,
          fullName,
        },
      });

      if (existingPersonalInfo) {
        await existingPersonalInfo.update(req.body);
        req.flash("success_msg", "Record updated successfully!");
      } else {
        const personalInformation = await PersonalInformation.create({
          ...req.body,
          userId,
        });
        req.flash("success_msg", "Personal Information Saved!");
        // return personalInformation;
        req.session.personalInfo = personalInformation;
      }
      res.redirect("/apply-travel-information");
    } catch (error) {
      throw error;
    }
  }
);

// travel-information
pagesRouter.get(
  "/apply-travel-information",
  ensureAuthenticated,
  checkRole(["applicant"]),
  async (req, res, next) => {
    try {
      const travelInfo = await TravelInformation.findOne({
        where: {
          userId: req.user.id,
        },
      });

      if (!travelInfo) {
        res.render("pages/forms/travel-information", { travelInfo: {} });
      } else {
        res.render("pages/forms/travel-information", { travelInfo });
      }
    } catch (error) {
      next(error);
    }
  }
);

pagesRouter.post(
  "/apply-travel-information",
  ensureAuthenticated,
  checkRole(["applicant"]),
  async (req, res) => {
    const userId = req.user.id;
    try {
      const existingTravelInfo = await TravelInformation.findOne({
        where: {
          userId: userId,
        },
      });

      if (existingTravelInfo) {
        await existingTravelInfo.update(req.body);
        req.flash("success_msg", "Record updated successfully!");
      } else {
        const travelInformation = await TravelInformation.create({
          ...req.body,
          userId,
        });
        req.flash("success_msg", "Travel Information Saved!");
        // return travelInformation;
        req.session.travelInfo = travelInformation;
      }
      res.redirect("/apply-employment-information");
    } catch (error) {
      throw error;
    }
  }
);

// employment information
pagesRouter.get(
  "/apply-employment-information",
  ensureAuthenticated,
  checkRole(["applicant"]),
  async (req, res) => {
    try {
      const employmentInfo = await EmploymentInformation.findOne({
        where: {
          userId: req.user.id,
        },
      });

      if (!employmentInfo) {
        res.render("pages/forms/employment-information", {
          employmentInfo: {},
        });
      } else {
        res.render("pages/forms/employment-information", { employmentInfo });
      }
    } catch (error) {
      next(error);
    }
  }
);

pagesRouter.post(
  "/apply-employment-information",
  ensureAuthenticated,
  checkRole(["applicant"]),
  async (req, res) => {
    const userId = req.user.id;
    try {
      const existingEmploymentInfo = await EmploymentInformation.findOne({
        where: {
          userId: userId,
        },
      });

      if (existingEmploymentInfo) {
        await existingEmploymentInfo.update(req.body);
        req.flash("success_msg", "Record updated successfully!");
      } else {
        const employmentInformation = await EmploymentInformation.create({
          ...req.body,
          userId,
        });
        req.flash("success_msg", "Employment Information Saved!");
        req.session.employmentInfo = employmentInformation;
      }
      res.redirect("/apply-financial-information");
    } catch (error) {
      throw error;
    }
  }
);

// financial information
pagesRouter.get(
  "/apply-financial-information",
  ensureAuthenticated,
  checkRole(["applicant"]),
  async (req, res, next) => {
    try {
      const financialInfo = await FinancialInformation.findOne({
        where: {
          userId: req.user.id,
        },
      });

      if (!financialInfo) {
        res.render("pages/forms/financial-information", { financialInfo: {} });
      } else {
        res.render("pages/forms/financial-information", { financialInfo });
      }
    } catch (error) {
      next(error);
    }
  }
);

pagesRouter.post(
  "/apply-financial-information",
  ensureAuthenticated,
  checkRole(["applicant"]),
  uploadFile("documents").fields([
    { name: "proofOfFunds", maxCount: 1 },
    { name: "incomeDetails", maxCount: 1 },
  ]),
  async (req, res) => {
    const userId = req.user.id;
    try {
      if (req.files["proofOfFunds"]) {
        req.body.proofOfFunds = req.files["proofOfFunds"][0].filename;
      }
      if (req.files["incomeDetails"]) {
        req.body.incomeDetails = req.files["incomeDetails"][0].filename;
      }

      const existingFinancialInfo = await FinancialInformation.findOne({
        where: {
          userId: userId,
        },
      });

      if (existingFinancialInfo) {
        await existingFinancialInfo.update(req.body);
        req.flash("success_msg", "Record updated successfully!");
      } else {
        const financialInformation = await FinancialInformation.create({
          ...req.body,
          userId,
        });
        req.flash("success_msg", "Financial Information Saved!");
        req.session.financialInformation = financialInformation;
      }
      res.redirect("/apply-travel-history-information");
    } catch (error) {
      throw error;
    }
  }
);

// previos travel information
pagesRouter.get(
  "/apply-travel-history-information",
  ensureAuthenticated,
  checkRole(["applicant"]),
  async (req, res, next) => {
    try {
      const travelHistoryInfo = await TravelHistoryInformation.findOne({
        where: {
          userId: req.user.id,
        },
      });

      if (!travelHistoryInfo) {
        res.render("pages/forms/travel-history-information", {
          travelHistoryInfo: {},
        });
      } else {
        res.render("pages/forms/travel-history-information", {
          travelHistoryInfo,
        });
      }
    } catch (error) {
      next(error);
    }
  }
);

pagesRouter.post(
  "/apply-travel-history",
  ensureAuthenticated,
  checkRole(["applicant"]),
  async (req, res) => {
    const userId = req.user.id;
    try {
      const existingTravelHistoryInfo = await TravelHistoryInformation.findOne({
        where: {
          userId: userId,
        },
      });

      if (existingTravelHistoryInfo) {
        await existingTravelHistoryInfo.update(req.body);
        req.flash("success_msg", "Record updated successfully!");
      } else {
        const travelHistoryInformation = await TravelHistoryInformation.create({
          ...req.body,
          userId,
        });
        req.flash("success_msg", "Employment Information Saved!");
        req.session.travelHistory = travelHistoryInformation;
      }
      res.redirect("/apply-health-information");
    } catch (error) {
      throw error;
    }
  }
);

// Health  information
pagesRouter.get(
  "/apply-health-information",
  ensureAuthenticated,
  checkRole(["applicant"]),
  async (req, res, next) => {
    try {
      const healthInfo = await HealthInformation.findOne({
        where: {
          userId: req.user.id,
        },
      });

      if (!healthInfo) {
        res.render("pages/forms/health-information", { healthInfo: {} });
      } else {
        res.render("pages/forms/health-information", { healthInfo });
      }
    } catch (error) {
      next(error);
    }
  }
);

pagesRouter.post(
  "/apply-health-information",
  ensureAuthenticated,
  uploadFile("documents").fields([
    { name: "medicalHistory", maxCount: 1 },
    { name: "vaccinationRecords", maxCount: 1 },
  ]),
  checkRole(["applicant"]),
  async (req, res) => {
    const userId = req.user.id;
    try {
      if (req.files["medicalHistory"]) {
        req.body.medicalHistory = req.files["medicalHistory"][0].filename;
      }
      if (req.files["vaccinationRecords"]) {
        req.body.vaccinationRecords =
          req.files["vaccinationRecords"][0].filename;
      }

      const existingHealthInfo = await HealthInformation.findOne({
        where: {
          userId: userId,
        },
      });

      if (existingHealthInfo) {
        await existingHealthInfo.update(req.body);
        req.flash("success_msg", "Record updated successfully!");
      } else {
        const healthInformation = await HealthInformation.create({
          ...req.body,
          userId,
        });
        req.flash("success_msg", "Financial Information Saved!");
        req.session.healthInformation = healthInformation;
      }
      res.redirect("/apply-supporting-documents");
    } catch (error) {
      throw error;
    }
  }
);

// Supporting Documents
pagesRouter.get(
  "/apply-supporting-documents",
  ensureAuthenticated,
  checkRole(["applicant"]),
  async (req, res, next) => {
    try {
      const supporttingInfo = await SupporttingInformation.findOne({
        where: {
          userId: req.user.id,
        },
      });

      if (!supporttingInfo) {
        res.render("pages/forms/supporting-document", { supporttingInfo: {} });
      } else {
        res.render("pages/forms/supporting-document", { supporttingInfo });
      }
    } catch (error) {
      next(error);
    }
  }
);

pagesRouter.post(
  "/apply-supporting-documents",
  ensureAuthenticated,
  checkRole(["applicant"]),
  uploadFile("documents").fields([
    { name: "photograph", maxCount: 1 },
    { name: "passport", maxCount: 1 },
    { name: "invitationLetter", maxCount: 1 },
    { name: "travelInsurance", maxCount: 1 },
  ]),
  async (req, res) => {
    const userId = req.user.id;
    try {
      if (req.files["photograph"]) {
        req.body.photograph = req.files["photograph"][0].filename;
      }
      if (req.files["passport"]) {
        req.body.passport = req.files["passport"][0].filename;
      }
      if (req.files["invitationLetter"]) {
        req.body.invitationLetter = req.files["invitationLetter"][0].filename;
      }
      if (req.files["travelInsurance"]) {
        req.body.travelInsurance = req.files["travelInsurance"][0].filename;
      }

      const existingSupporttingInfo = await SupporttingInformation.findOne({
        where: {
          userId: userId,
        },
      });

      if (existingSupporttingInfo) {
        await existingSupporttingInfo.update(req.body);
        req.flash("success_msg", "Record updated successfully!");
      } else {
        const supporttingInformation = await SupporttingInformation.create({
          ...req.body,
          userId,
        });
        req.flash("success_msg", "Supportting Information Saved!");
        req.session.supportingDocuments = supporttingInformation;
      }
      res.redirect("/apply-security-information");
    } catch (error) {
      throw error;
    }
  }
);

// Security Informatino
pagesRouter.get(
  "/apply-security-information",
  ensureAuthenticated,
  checkRole(["applicant"]),
  async (req, res, next) => {
    try {
      const securityInfo = await SecurityInformation.findOne({
        where: {
          userId: req.user.id,
        },
      });

      if (!securityInfo) {
        res.render("pages/forms/security-information", { securityInfo: {} });
      } else {
        res.render("pages/forms/security-information", { securityInfo });
      }
    } catch (error) {
      next(error);
    }
  }
);

pagesRouter.post(
  "/apply-security-information",
  ensureAuthenticated,
  checkRole(["applicant"]),
  uploadFile("documents").fields([
    { name: "detailsOfCriminalRecord", maxCount: 1 },
  ]),
  async (req, res) => {
    const userId = req.user.id;
    try {
      if (req.files["detailsOfCriminalRecord"]) {
        req.body.detailsOfCriminalRecord =
          req.files["detailsOfCriminalRecord"][0].filename;
      }

      const existingSecurityInfo = await SecurityInformation.findOne({
        where: {
          userId: userId,
        },
      });

      if (existingSecurityInfo) {
        await existingSecurityInfo.update(req.body);
        req.flash("success_msg", "Record updated successfully!");
      } else {
        const securityInformation = await SecurityInformation.create({
          ...req.body,
          userId,
        });
        req.flash("success_msg", "Information Saved!");
        req.session.securityInformation = securityInformation;
      }
      res.redirect("/apply-digital-signature");
    } catch (error) {
      throw error;
    }
  }
);

// digital information
pagesRouter.get(
  "/apply-digital-signature",
  ensureAuthenticated,
  checkRole(["applicant"]),
  async (req, res, next) => {
    try {
      const digitalSignature = await DigitalSignature.findOne({
        where: {
          userId: req.user.id,
        },
      });

      if (!digitalSignature) {
        res.render("pages/forms/digital-signature", { digitalSignature: {} });
      } else {
        res.render("pages/forms/digital-signature", { digitalSignature });
      }
    } catch (error) {
      next(error);
    }
  }
);

pagesRouter.post(
  "/apply-digital-signature",
  ensureAuthenticated,
  checkRole(["applicant"]),
  async (req, res) => {
    const userId = req.user.id;
    try {
      const existingDigitalSignature = await DigitalSignature.findOne({
        where: {
          userId: userId,
        },
      });

      if (existingDigitalSignature) {
        await existingDigitalSignature.update(req.body);
        req.flash("success_msg", "Record updated successfully!");
      } else {
        const digiDigitalSignature = await DigitalSignature.create({
          ...req.body,
          userId,
        });
        req.flash("success_msg", "Information Saved!");
        req.session.digitalSignature = digiDigitalSignature;
      }
      res.redirect("/apply-confirmation");
    } catch (error) {
      throw error;
    }
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
      supportingDocuments,
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
