const Country = require("../models/country");

class CountriesController {
  async getAllCountries() {
    try {
      const countrys = await Country.findAll();
      return countrys;
    } catch (error) {
      throw error;
    }
  }
  async getCountry(countryId) {
    try {
      const country = await Country.findByPk(countryId);

      if (!country) {
        throw Error("Country not found!");
      }
      return country;
    } catch (error) {
      throw error;
    }
  }

  async createCountry(country) {
    try {
      const createdCountry = await Country.create(country);
      return createdCountry;
    } catch (error) {
      throw error;
    }
  }

  async editCountry(country) {
    const { id } = country;
    try {
      const country = await Country.findByPk(id);

      if (!country) {
        throw Error("Country not found!");
      }
      const updatedCountry = await country.update(country);
      return updatedCountry;
    } catch (error) {
      throw error;
    }
  }

  async deleteCountry(id) {
    try {
      const country = await Country.findByPk(id);
      if (!country) {
        throw new Error("Country not found");
      }
      await country.destroy();
      return { message: "Country deleted successfully" };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = CountriesController;
