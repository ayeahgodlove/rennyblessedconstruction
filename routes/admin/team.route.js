const express = require("express");

const {
  ensureAuthenticated,
} = require("../../config/middleware/is-authenticated.middleware");
const TeamsController = require("../../controllers/team.controller");
const { uploadImage } = require("../../services/upload.config");
const checkRole = require("../../config/middleware/is-authorized.middle");

const teamRouter = express.Router();
const teamsController = new TeamsController();

teamRouter.get(
  "/",
  ensureAuthenticated,
  checkRole(["admin", "super-admin"]), 
  async (req, res) => {
    const teams = await teamsController.getAllTeams();
    res.render("pages/admin/teams", { teams });
  }
);

teamRouter.get("/create", ensureAuthenticated, async (req, res) => {
  res.render("pages/admin/teams/create");
});

teamRouter.post(
  "/create",
  ensureAuthenticated,
  checkRole(["admin", "super-admin"]),
  uploadImage("teams").single("imageUrl"),
  async (req, res) => {
    try {
      let teamData = req.body;
      if (req.file) {
        teamData.imageUrl = req.file.filename;
      }
      await teamsController.createTeam(teamData);
      // res.render("pages/admin/teams/create");
      res.redirect("/dashboard/teams");
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
);

teamRouter.get(
  "/edit/:id",
  ensureAuthenticated,
  checkRole(["admin", "super-admin"]),
  async (req, res) => {
    try {
      const team = await teamsController.getTeam(
        req.params.id
      );
      res.render("pages/admin/teams/edit", { team });
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
);

// Update Team API
teamRouter.post(
  "/edit/:id",
  ensureAuthenticated,
  checkRole(["admin", "super-admin"]),
  uploadImage("teams").single("imageUrl"),
  async (req, res) => {
    try {
      const teamData = req.body;
      if (req.file) {
        teamData.imageUrl = req.file.filename;
      }
      await teamsController.editTeam({
        id: req.params.id,
        ...teamData,
      });
      res.redirect("/dashboard/teams");
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
);

// Delete Team API
teamRouter.post(
  "/delete/:id",
  ensureAuthenticated,
  checkRole(["admin", "super-admin"]),
  async (req, res) => {
    try {
      await teamsController.deleteTeam(req.params.id);
      res.redirect("/dashboard/teams");
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
);

module.exports = teamRouter;
