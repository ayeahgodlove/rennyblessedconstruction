const VisaApplication = require("../models/visa-application");

class VisaApplicationsController {
  async getAllVisaApplications() {
    try {
      const visaApplications = await VisaApplication.findAll();
      return visaApplications;
    } catch (error) {
      throw error;
    }
  }
  async getVisaApplication(visaApplicationId) {
    try {
      const visaApplication = await VisaApplication.findByPk(visaApplicationId);

      if (!visaApplication) {
        throw Error("VisaApplication not found!");
      }
      return visaApplication;
    } catch (error) {
      throw error;
    }
  }

  async editVisaApplication(visaApplication) {
    const { id } = visaApplication;
    try {
      const visaApplication = await VisaApplication.findByPk(id);

      if (!visaApplication) {
        throw Error("VisaApplication not found!");
      }
      const updatedVisaApplication = await visaApplication.update(visaApplication);
      return updatedVisaApplication;
    } catch (error) {
      throw error;
    }
  }

  async deleteVisaApplication(id) {
    try {
      const visaApplication = await VisaApplication.findByPk(id);
      if (!visaApplication) {
        throw new Error("VisaApplication not found");
      }
      await visaApplication.destroy();
      return { message: "VisaApplication deleted successfully" };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = VisaApplicationsController;
