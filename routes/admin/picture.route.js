const express = require("express");

const {
  ensureAuthenticated,
} = require("../../config/middleware/is-authenticated.middleware");
const PicturesController = require("../../controllers/picture.controller");
const { uploadImage } = require("../../services/upload.config");
const checkRole = require("../../config/middleware/is-authorized.middle");
const ProjectsController = require("../../controllers/project.controller");

const pictureRouter = express.Router();
const picturesController = new PicturesController();
const projectsController = new ProjectsController();

pictureRouter.get(
  "/",
  ensureAuthenticated,
  checkRole(["admin", "super-admin"]),
  async (req, res) => {
    const pictures = await picturesController.getAllPictures();
    res.render("pages/admin/pictures", { pictures });
  }
);

pictureRouter.get(
  "/create",
  ensureAuthenticated,
  checkRole(["admin", "super-admin"]),
  async (req, res) => {
    const projects = await projectsController.getAllProjects();
    res.render("pages/admin/pictures/create", { projects });
  }
);

pictureRouter.post(
  "/create",
  ensureAuthenticated,
  checkRole(["admin", "super-admin"]),
  uploadImage("pictures").single("imageUrl"),
  async (req, res) => {
    try {
      let pictureData = req.body;
      if (req.file) {
        pictureData.imageUrl = req.file.filename;
      }
      await picturesController.createPicture(pictureData);
      // res.render("pages/admin/pictures/create");
      res.redirect("/dashboard/pictures");
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
);

pictureRouter.get(
  "/edit/:id",
  ensureAuthenticated,
  checkRole(["admin", "super-admin"]),
  async (req, res) => {
    try {
      const picture = await picturesController.getPicture(req.params.id);
      const projects = await projectsController.getAllProjects();
      res.render("pages/admin/pictures/edit", {
        picture,
        projects,
        projectId: project.projectId,
      });
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
);

// Update Picture API
pictureRouter.post(
  "/edit/:id",
  ensureAuthenticated,
  checkRole(["admin", "super-admin"]),
  uploadImage("pictures").single("imageUrl"),
  async (req, res) => {
    try {
      const pictureData = req.body;
      if (req.file) {
        pictureData.imageUrl = req.file.filename;
      }
      await picturesController.editPicture({
        id: req.params.id,
        ...pictureData,
      });
      res.redirect("/dashboard/pictures");
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
);

// Delete Picture API
pictureRouter.post(
  "/delete/:id",
  ensureAuthenticated,
  checkRole(["admin", "super-admin"]),
  async (req, res) => {
    try {
      await picturesController.deletePicture(req.params.id);
      res.redirect("/dashboard/pictures");
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
);

module.exports = pictureRouter;
