const VisaCategory = require("../models/visa-category");

class VisaCategoriesController {
  async getAllVisaCategories() {
    try {
      const visaCategorys = await VisaCategory.findAll();
      return visaCategorys;
    } catch (error) {
      throw error;
    }
  }
  async getVisaCategory(visaCategoryId) {
    try {
      const visaCategory = await VisaCategory.findByPk(visaCategoryId);

      if (!visaCategory) {
        throw Error("VisaCategory not found!");
      }
      return visaCategory;
    } catch (error) {
      throw error;
    }
  }

  async createVisaCategory(visaCategory) {
    try {
      const createdVisaCategory = await VisaCategory.create(visaCategory);
      return createdVisaCategory;
    } catch (error) {
      throw error;
    }
  }

  async editVisaCategory(visaCategory) {
    const { id } = visaCategory;
    try {
      const visaCategory = await VisaCategory.findByPk(id);

      if (!visaCategory) {
        throw Error("VisaCategory not found!");
      }
      const updatedVisaCategory = await visaCategory.update(visaCategory);
      return updatedVisaCategory;
    } catch (error) {
      throw error;
    }
  }

  async deleteVisaCategory(id) {
    try {
      const visaCategory = await VisaCategory.findByPk(id);
      if (!visaCategory) {
        throw new Error("VisaCategory not found");
      }
      await visaCategory.destroy();
      return { message: "VisaCategory deleted successfully" };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = VisaCategoriesController;
