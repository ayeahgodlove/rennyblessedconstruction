const Testimonial = require("../models/testimonial");

const ALL_TESTIMONIALS_CACHE_TTL_MS = 30_000;
let allTestimonialsCache = { data: null, expiresAt: 0 };

class TestimonialsController {
  async getAllTestimonials() {
    try {
      const now = Date.now();
      if (allTestimonialsCache.data && now < allTestimonialsCache.expiresAt) {
        return allTestimonialsCache.data;
      }

      const testimonials = await Testimonial.findAll();
      allTestimonialsCache = {
        data: testimonials,
        expiresAt: now + ALL_TESTIMONIALS_CACHE_TTL_MS,
      };
      return testimonials;
    } catch (error) {
      throw error;
    }
  }
  async getTestimonial(testimonialId) {
    try {
      const testimonial = await Testimonial.findByPk(testimonialId);

      if (!testimonial) {
        throw Error("Testimonial not found!");
      }
      return testimonial;
    } catch (error) {
      throw error;
    }
  }

  async createTestimonial(testimonial) {
    try {
      const createdTestimonial = await Testimonial.create(testimonial);
      allTestimonialsCache = { data: null, expiresAt: 0 };
      return createdTestimonial;
    } catch (error) {
      throw error;
    }
  }

  async editTestimonial(testimonialData) {
    const { id } = testimonialData;
    try {
      const testimonial = await Testimonial.findByPk(id);

      if (!testimonial) {
        throw Error("Testimonial not found!");
      }
      const updatedTestimonial = await testimonial.update(testimonialData);
      allTestimonialsCache = { data: null, expiresAt: 0 };
      return updatedTestimonial;
    } catch (error) {
      throw error;
    }
  }

  async deleteTestimonial(id) {
    try {
      const testimonial = await Testimonial.findByPk(id);
      if (!testimonial) {
        throw new Error("Testimonial not found");
      }
      await testimonial.destroy();
      allTestimonialsCache = { data: null, expiresAt: 0 };
      return { message: "Testimonial deleted successfully" };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = TestimonialsController;
