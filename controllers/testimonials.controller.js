const Testimonial = require("../models/testimonial");

class TestimonialsController {
  async getAllTestimonials() {
    try {
      const testimonials = await Testimonial.findAll();
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
      return createdTestimonial;
    } catch (error) {
      throw error;
    }
  }

  async editTestimonial(testimonial) {
    const { id } = testimonial;
    try {
      const testimonial = await Testimonial.findByPk(id);

      if (!testimonial) {
        throw Error("Testimonial not found!");
      }
      const updatedTestimonial = await testimonial.update(testimonial);
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
      return { message: "Testimonial deleted successfully" };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = TestimonialsController;
