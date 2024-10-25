const express = require("express");

const {
  ensureAuthenticated,
} = require("../../config/middleware/is-authenticated.middleware");
const ProjectsController = require("../../controllers/project.controller");
const PicturesController = require("../../controllers/picture.controller");
const CategoriesController = require("../../controllers/category.controller");
const checkRole = require("../../config/middleware/is-authorized.middle");

const projectRouter = express.Router();
const projectsController = new ProjectsController();
const categoriesController = new CategoriesController();
const picturesController = new PicturesController();

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
    const categories = await categoriesController.getAllCategories();
    res.render("pages/admin/projects/create", { categories });
  }
);

projectRouter.post(
  "/create",
  ensureAuthenticated,
  checkRole(["admin", "super-admin"]),
  async (req, res) => {
    try {
      let projectData = req.body;
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
      const projectData = await projectsController.getProject(req.params.id);
      const categories = await categoriesController.getAllCategories();
      const pictures = await picturesController.getProjectWithPictures(
        req.params.id
      );
      const project = {
        ...projectData.toJSON(),
        pictures: pictures.map((picture) => picture.toJSON()),
      };
      res.render("pages/admin/projects/edit", {
        project,
        categories,
        categoryId: project.categoryId,
      });
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
  async (req, res) => {
    try {
      const projectData = req.body;
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
