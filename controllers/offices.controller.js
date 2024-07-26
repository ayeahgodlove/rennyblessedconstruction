const Office = require("../models/office");

class OfficesController {
  async getAllOffices() {
    try {
      const offices = await Office.findAll();
      return offices;
    } catch (error) {
      throw error;
    }
  }
  async getOffice(officeId) {
    try {
      const office = await Office.findByPk(officeId);

      if (!office) {
        throw Error("Office not found!");
      }
      return office;
    } catch (error) {
      throw error;
    }
  }

  async createOffice(office) {
    try {
      const createdOffice = await Office.create(office);
      return createdOffice;
    } catch (error) {
      throw error;
    }
  }

  async editOffice(office) {
    const { id } = office;
    try {
      const office = await Office.findByPk(id);

      if (!office) {
        throw Error("Office not found!");
      }
      const updatedOffice = await office.update(office);
      return updatedOffice;
    } catch (error) {
      throw error;
    }
  }

  async deleteOffice(id) {
    try {
      const office = await Office.findByPk(id);
      if (!office) {
        throw new Error("Office not found");
      }
      await office.destroy();
      return { message: "Office deleted successfully" };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = OfficesController;
