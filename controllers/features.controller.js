const Feature = require("../models/feature");

class FeaturesController {
  async getAllFeatures() {
    try {
      const features = await Feature.findAll();
      return features;
    } catch (error) {
      throw error;
    }
  }
  async getFeature(featureId) {
    try {
      const feature = await Feature.findByPk(featureId);

      if (!feature) {
        throw Error("Feature not found!");
      }
      return feature;
    } catch (error) {
      throw error;
    }
  }

  async createFeature(feature) {
    try {
      const createdFeature = await Feature.create(feature);
      return createdFeature;
    } catch (error) {
      throw error;
    }
  }

  async editFeature(feature) {
    const { id } = feature;
    try {
      const feature = await Feature.findByPk(id);

      if (!feature) {
        throw Error("Feature not found!");
      }
      const updatedFeature = await feature.update(feature);
      return updatedFeature;
    } catch (error) {
      throw error;
    }
  }

  async deleteFeature(id) {
    try {
      const feature = await Feature.findByPk(id);
      if (!feature) {
        throw new Error("Feature not found");
      }
      await feature.destroy();
      return { message: "Feature deleted successfully" };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = FeaturesController;
