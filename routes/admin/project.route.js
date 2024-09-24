const express = require("express");

const {
  ensureAuthenticated,
} = require("../../config/middleware/is-authenticated.middleware");
const ProjectsController = require("../../controllers/project.controller");
const { uploadImage } = require("../../services/upload.config");
const checkRole = require("../../config/middleware/is-authorized.middle");

const projectRouter = express.Router();
const projectsController = new ProjectsController();

projectRouter.get(
  "/",
  ensureAuthenticated,
  checkRole(["admin", "super-admin"]),
  async (req, res) => {
    const projects = await projectsController.getAllProjects();
    res.render("pages/admin/projects", { projects });
  }
);

projectRouter.get(
  "/create",
  ensureAuthenticated,
  checkRole(["admin", "super-admin"]),
  async (req, res) => {
    res.render("pages/admin/projects/create");
  }
);

projectRouter.post(
  "/create",
  ensureAuthenticated,
  checkRole(["admin", "super-admin"]),
  uploadImage("projects").single("imageUrl"),
  async (req, res) => {
    try {
      let projectData = req.body;
      if (req.file) {
        projectData.imageUrl = req.file.filename;
      }
      await projectsController.createProject(projectData);
      // res.render("pages/admin/projects/create");
      res.redirect("/dashboard/projects");
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
);

projectRouter.get(
  "/edit/:id",
  ensureAuthenticated,
  checkRole(["admin", "super-admin"]),
  async (req, res) => {
    try {
      const project = await projectsController.getProject(req.params.id);
      res.render("pages/admin/projects/edit", { project });
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
);

// Update Project API
projectRouter.post(
  "/edit/:id",
  ensureAuthenticated,
  checkRole(["admin", "super-admin"]),
  uploadImage("projects").single("imageUrl"),
  async (req, res) => {
    try {
      const projectData = req.body;
      if (req.file) {
        projectData.imageUrl = req.file.filename;
      }
      await projectsController.editProject({
        id: req.params.id,
        ...projectData,
      });
      res.redirect("/dashboard/projects");
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
);

// Delete Project API
projectRouter.post(
  "/delete/:id",
  ensureAuthenticated,
  checkRole(["admin", "super-admin"]),
  async (req, res) => {
    try {
      await projectsController.deleteProject(req.params.id);
      res.redirect("/dashboard/projects");
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
);

module.exports = projectRouter;
