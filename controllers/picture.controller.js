const Picture = require("../models/picture");

class PicturesController {
  async getAllPictures() {
    try {
      const pictures = await Picture.findAll();
      return pictures;
    } catch (error) {
      throw error;
    }
  }
  async getProjectWithPictures(projectId) {
    try {
      const pictures = await Picture.findAll({
        where: { projectId },
      });

      return pictures;
    } catch (error) {
      throw error;
    }
  }
  async getPicture(pictureId) {
    try {
      const picture = await Picture.findByPk(pictureId);

      if (!picture) {
        throw Error("Picture not found!");
      }
      return picture;
    } catch (error) {
      throw error;
    }
  }

  async createPicture(picture) {
    try {
      const createdPicture = await Picture.create(picture);
      return createdPicture;
    } catch (error) {
      throw error;
    }
  }

  async editPicture(pictureData) {
    const { id } = pictureData;
    try {
      const picture = await Picture.findByPk(id);

      if (!picture) {
        throw Error("Picture not found!");
      }
      const updatedPicture = await picture.update(pictureData);
      return updatedPicture;
    } catch (error) {
      throw error;
    }
  }

  async deletePicture(id) {
    try {
      const picture = await Picture.findByPk(id);
      if (!picture) {
        throw new Error("Picture not found");
      }
      await picture.destroy();
      return { message: "Picture deleted successfully" };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = PicturesController;
