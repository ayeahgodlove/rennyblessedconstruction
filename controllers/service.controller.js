const Service = require("../models/service");

class ServicesController {
  async getAllServices() {
    try {
      const services = await Service.findAll();
      return services;
    } catch (error) {
      throw error;
    }
  }
  async getService(serviceId) {
    try {
      const service = await Service.findByPk(serviceId);

      if (!service) {
        throw Error("Service not found!");
      }
      return service;
    } catch (error) {
      throw error;
    }
  }

  async getServiceByTitle(title) {
    try {
      const service = await Service.findOne({ title });

      if (!service) {
        throw Error("Service not found!");
      }
      return service;
    } catch (error) {
      throw error;
    }
  }

  async createService(service) {
    try {
      const createdService = await Service.create(service);
      return createdService;
    } catch (error) {
      throw error;
    }
  }

  async editService(serviceData) {
    const { id } = serviceData;
    try {
      const service = await Service.findByPk(id);

      if (!service) {
        throw Error("Service not found!");
      }
      const updatedService = await service.update(serviceData);
      return updatedService;
    } catch (error) {
      throw error;
    }
  }

  async deleteService(id) {
    try {
      const service = await Service.findByPk(id);
      if (!service) {
        throw new Error("Service not found");
      }
      await service.destroy();
      return { message: "Service deleted successfully" };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = ServicesController;
