const Project = require("../models/project");
const Picture = require("../models/picture");

const ALL_PROJECTS_CACHE_TTL_MS = 30_000;
let allProjectsCache = { data: null, expiresAt: 0 };

class ProjectsController {
  async getAllProjects() {
    try {
      const now = Date.now();
      if (allProjectsCache.data && now < allProjectsCache.expiresAt) {
        return allProjectsCache.data;
      }

      const projects = await Project.findAll({
        include: {
          model: Picture,
          as: "pictures", // The alias defined in your association (if applicable)
        },
      });

      allProjectsCache = {
        data: projects,
        expiresAt: now + ALL_PROJECTS_CACHE_TTL_MS,
      };
      return projects;
    } catch (error) {
      throw error;
    }
  }

  async getProject(projectId) {
    try {
      const project = await Project.findByPk(projectId);

      if (!project) {
        throw Error("Project not found!");
      }
      return project;
    } catch (error) {
      throw error;
    }
  }

  async getProjectByTitle(title) {
    try {
      const project = await Project.findOne({ title });

      if (!project) {
        throw Error("Project not found!");
      }
      return project;
    } catch (error) {
      throw error;
    }
  }


  async createProject(project) {
    try {
      const createdProject = await Project.create(project);
      allProjectsCache = { data: null, expiresAt: 0 };
      return createdProject;
    } catch (error) {
      throw error;
    }
  }

  async editProject(projectData) {
    const { id } = projectData;
    try {
      const project = await Project.findByPk(id, {
        include: {
          model: Picture,
          as: "pictures", // Ensure this matches the association alias
        },
      });

      if (!project) {
        throw Error("Project not found!");
      }
      const updatedProject = await project.update(projectData);
      allProjectsCache = { data: null, expiresAt: 0 };
      return updatedProject;
    } catch (error) {
      throw error;
    }
  }

  async deleteProject(id) {
    try {
      const project = await Project.findByPk(id, {
        include: {
          model: Picture,
          as: "pictures", // Ensure this matches the association alias
        },
      });
      if (!project) {
        throw new Error("Project not found");
      }
      await project.destroy();
      allProjectsCache = { data: null, expiresAt: 0 };
      return { message: "Project deleted successfully" };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = ProjectsController;
