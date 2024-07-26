const Training = require("../models/training");

class TrainingsController {
  async getAllTrainings() {
    try {
      const trainings = await Training.findAll();
      return trainings;
    } catch (error) {
      throw error;
    }
  }
  async getTraining(trainingId) {
    try {
      const training = await Training.findByPk(trainingId);

      if (!training) {
        throw Error("Training not found!");
      }
      return training;
    } catch (error) {
      throw error;
    }
  }

  async createTraining(training) {
    try {
      const createdTraining = await Training.create(training);
      return createdTraining;
    } catch (error) {
      throw error;
    }
  }

  async editTraining(training) {
    const { id } = training;
    try {
      const training = await Training.findByPk(id);

      if (!training) {
        throw Error("Training not found!");
      }
      const updatedTraining = await training.update(training);
      return updatedTraining;
    } catch (error) {
      throw error;
    }
  }

  async deleteTraining(id) {
    try {
      const training = await Training.findByPk(id);
      if (!training) {
        throw new Error("Training not found");
      }
      await training.destroy();
      return { message: "Training deleted successfully" };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = TrainingsController;
