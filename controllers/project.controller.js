const Project = require("../models/project");

class ProjectsController {
  async getAllProjects() {
    try {
      const projects = await Project.findAll();
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

  async createProject(project) {
    try {
      const createdProject = await Project.create(project);
      return createdProject;
    } catch (error) {
      throw error;
    }
  }

  async editProject(projectData) {
    const { id } = projectData;
    try {
      const project = await Project.findByPk(id);

      if (!project) {
        throw Error("Project not found!");
      }
      const updatedProject = await project.update(projectData);
      return updatedProject;
    } catch (error) {
      throw error;
    }
  }

  async deleteProject(id) {
    try {
      const project = await Project.findByPk(id);
      if (!project) {
        throw new Error("Project not found");
      }
      await project.destroy();
      return { message: "Project deleted successfully" };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = ProjectsController;
