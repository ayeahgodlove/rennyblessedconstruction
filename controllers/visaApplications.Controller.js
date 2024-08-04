const PersonalInformation = require("../models/personal-information");
const VisaApplication = require("../models/visa-application");

class VisaApplicationsController {
  async getAllVisaApplications() {
    try {
      const visaApplications = await VisaApplication.findAll();

      // Step 2: Extract unique user IDs from the visa applications
      const userIds = visaApplications.map((application) => application.userId);
      const uniqueUserIds = [...new Set(userIds)];

      // Step 3: Fetch personal information for these users
      const personalInformation = await PersonalInformation.findAll({
        where: {
          userId: uniqueUserIds,
        },
        attributes: [
          "userId",
          "fullName",
          "email",
          "phone",
          "nationality",
          "gender",
          "maritalStatus",
        ],
      });

      // Step 4: Create a map of userId to personal information
      const personalInfoMap = {};
      personalInformation.forEach((info) => {
        personalInfoMap[info.userId] = info;
      });

      // Step 5: Map personal information to visa applications
      const visaApplicationsWithPersonalInfo = visaApplications.map(
        (application) => {
          const personalInfo = personalInfoMap[application.userId] || {};
          return {
            ...application.toJSON(),
            fullName: personalInfo.fullName || null,
            email: personalInfo.email || null,
            phone: personalInfo.phone || null,
            nationality: personalInfo.nationality || null,
            gender: personalInfo.gender || null,
            maritalStatus: personalInfo.maritalStatus || null,
          };
        }
      );

      return visaApplicationsWithPersonalInfo;
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
      const item = await VisaApplication.findByPk(id);

      if (!item) {
        throw Error("VisaApplication not found!");
      }
      const updatedVisaApplication = await item.update({
        ...item.dataValues,
        ...visaApplication,
      });
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
