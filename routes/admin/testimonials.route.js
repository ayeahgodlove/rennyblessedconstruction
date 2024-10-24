const express = require("express");

const {
  ensureAuthenticated,
} = require("../../config/middleware/is-authenticated.middleware");
const TestimonialsController = require("../../controllers/testimonials.controller");
const { uploadImage } = require("../../services/upload.config");
const checkRole = require("../../config/middleware/is-authorized.middle");

const testimonialRouter = express.Router();
const testimonialsController = new TestimonialsController();

testimonialRouter.get(
  "/",
  ensureAuthenticated,
  checkRole(["admin", "super-admin"]),
  async (req, res) => {
    const testimonials = await testimonialsController.getAllTestimonials();
    res.render("pages/admin/testimonials", { testimonials });
  }
);

testimonialRouter.get("/create", ensureAuthenticated, async (req, res) => {
  res.render("pages/admin/testimonials/create");
});

testimonialRouter.post(
  "/create",
  ensureAuthenticated,
  checkRole(["admin", "super-admin"]),
  uploadImage("testimonials").single("imageUrl"),
  async (req, res) => {
    try {
      let testimonialData = req.body;
      if (req.file) {
        testimonialData.imageUrl = req.file.filename;
      }
      await testimonialsController.createTestimonial(testimonialData);
      // res.render("pages/admin/testimonials/create");
      res.redirect("/dashboard/testimonials");
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
);

testimonialRouter.get(
  "/edit/:id",
  ensureAuthenticated,
  checkRole(["admin", "super-admin"]),
  async (req, res) => {
    try {
      const testimonial = await testimonialsController.getTestimonial(
        req.params.id
      );
      res.render("pages/admin/testimonials/edit", { testimonial });
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
);

// Update Testimonial API
testimonialRouter.post(
  "/edit/:id",
  ensureAuthenticated,
  checkRole(["admin", "super-admin"]),
  uploadImage("testimonials").single("imageUrl"),
  async (req, res) => {
    try {
      const testimonialData = req.body;
      if (req.file) {
        testimonialData.imageUrl = req.file.filename;
      }
      await testimonialsController.editTestimonial({
        id: req.params.id,
        ...testimonialData,
      });
      res.redirect("/dashboard/testimonials");
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
);

// Delete Testimonial API
testimonialRouter.post(
  "/delete/:id",
  ensureAuthenticated,
  checkRole(["admin", "super-admin"]),
  async (req, res) => {
    try {
      await testimonialsController.deleteTestimonial(req.params.id);
      res.redirect("/dashboard/testimonials");
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
);

module.exports = testimonialRouter;
