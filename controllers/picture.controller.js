const Picture = require("../models/picture");

const ALL_PICTURES_CACHE_TTL_MS = 30_000;
let allPicturesCache = { data: null, expiresAt: 0 };

class PicturesController {
  async getAllPictures() {
    try {
      const now = Date.now();
      if (allPicturesCache.data && now < allPicturesCache.expiresAt) {
        return allPicturesCache.data;
      }

      const pictures = await Picture.findAll();
      allPicturesCache = {
        data: pictures,
        expiresAt: now + ALL_PICTURES_CACHE_TTL_MS,
      };
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
      allPicturesCache = { data: null, expiresAt: 0 };
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
      allPicturesCache = { data: null, expiresAt: 0 };
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
      allPicturesCache = { data: null, expiresAt: 0 };
      return { message: "Picture deleted successfully" };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = PicturesController;
