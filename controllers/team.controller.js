const Team = require("../models/team");

const ALL_TEAMS_CACHE_TTL_MS = 30_000;
let allTeamsCache = { data: null, expiresAt: 0 };

class TeamsController {
  async getAllTeams() {
    try {
      const now = Date.now();
      if (allTeamsCache.data && now < allTeamsCache.expiresAt) {
        return allTeamsCache.data;
      }

      const teams = await Team.findAll();
      allTeamsCache = { data: teams, expiresAt: now + ALL_TEAMS_CACHE_TTL_MS };
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
      allTeamsCache = { data: null, expiresAt: 0 };
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
      allTeamsCache = { data: null, expiresAt: 0 };
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
      allTeamsCache = { data: null, expiresAt: 0 };
      return { message: "Team deleted successfully" };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = TeamsController;
