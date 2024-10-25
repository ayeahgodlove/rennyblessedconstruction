const Team = require("../models/team");

class TeamsController {
  async getAllTeams() {
    try {
      const teams = await Team.findAll();
      return teams;
    } catch (error) {
      throw error;
    }
  }
  async getTeam(teamId) {
    try {
      const team = await Team.findByPk(teamId);

      if (!team) {
        throw Error("Team not found!");
      }
      return team;
    } catch (error) {
      throw error;
    }
  }

  async createTeam(team) {
    try {
      const createdTeam = await Team.create(team);
      return createdTeam;
    } catch (error) {
      throw error;
    }
  }

  async editTeam(teamData) {
    const { id } = teamData;
    try {
      const team = await Team.findByPk(id);

      if (!team) {
        throw Error("Team not found!");
      }
      const updatedTeam = await team.update(teamData);
      return updatedTeam;
    } catch (error) {
      throw error;
    }
  }

  async deleteTeam(id) {
    try {
      const team = await Team.findByPk(id);
      if (!team) {
        throw new Error("Team not found");
      }
      await team.destroy();
      return { message: "Team deleted successfully" };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = TeamsController;
