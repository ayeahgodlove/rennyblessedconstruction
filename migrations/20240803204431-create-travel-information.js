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
    await queryInterface.createTable("travel-information", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "user",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      
      visaType: {
        type: Sequelize.STRING(128),
        allowNull: false,
      },
      purposeOfVisit: {
        type: Sequelize.TEXT,
        allowNull: false,
      },

      arrivalDate: {
        type: Sequelize.DATE,
        allowNull: false,
        // unique: true,
      },
      departureDate: {
        type: Sequelize.DATE,
        allowNull: false,
        // unique: true,
      },
      durationOfStay: {
        type: Sequelize.STRING(10),
        allowNull: false,
        // unique: true,
      },

      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
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
    await queryInterface.dropTable("travel-information");
  },
};
