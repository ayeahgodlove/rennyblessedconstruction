"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable("team", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      personName: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      profession: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      imageUrl: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      biography: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      facebookUrl: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      twitterUrl: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      linkedInUrl: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      instagramUrl: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      rating: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable("team");
  },
};
