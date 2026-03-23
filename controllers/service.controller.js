const Service = require("../models/service");

// Small in-memory cache for frequently requested page data.
const ALL_SERVICES_CACHE_TTL_MS = 30_000;
let allServicesCache = { data: null, expiresAt: 0 };

class ServicesController {
  async getAllServices() {
    try {
      const now = Date.now();
      if (allServicesCache.data && now < allServicesCache.expiresAt) {
        return allServicesCache.data;
      }

      const services = await Service.findAll();
      allServicesCache = {
        data: services,
        expiresAt: now + ALL_SERVICES_CACHE_TTL_MS,
      };
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
      const service = await Service.findOne({ where: { title } });
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
      allServicesCache = { data: null, expiresAt: 0 };
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
      allServicesCache = { data: null, expiresAt: 0 };
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
      allServicesCache = { data: null, expiresAt: 0 };
      return { message: "Service deleted successfully" };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = ServicesController;
