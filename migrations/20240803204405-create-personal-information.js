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

    await queryInterface.createTable("personal-information", {
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
      fullName: {
        type: Sequelize.STRING(255),
        allowNull: false,
        unique: true,
      },
      phone: {
        type: Sequelize.STRING(255),
        allowNull: false,
        unique: true,
      },
      email: {
        type: Sequelize.STRING(255),
        allowNull: false,
        unique: true,
      },
      address: {
        type: Sequelize.STRING(255),
        allowNull: false,
        // unique: true,
      },
      dateOfBirth: {
        type: Sequelize.DATE,
        allowNull: false,
        // unique: true,
      },
      birthCountry: {
        type: Sequelize.STRING(255),
        allowNull: false,
        // unique: true,
      },
      nationality: {
        type: Sequelize.STRING(255),
        allowNull: false,
        // unique: true,
      },
      gender: {
        type: Sequelize.STRING(25),
        allowNull: false,
        // unique: true,
      },
      maritalStatus: {
        type: Sequelize.STRING(25),
        allowNull: false,
        // unique: true,
      },
      passportNumber: {
        type: Sequelize.STRING(255),
        allowNull: false,
        // unique: true,
      },
      passportIssueDate: {
        type: Sequelize.DATE,
        allowNull: false,
        // unique: true,
      },
      passportExpiryDate: {
        type: Sequelize.DATE,
        allowNull: false,
        // unique: true,
      },
      passportIssuingCountry: {
        type: Sequelize.STRING(255),
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
    await queryInterface.dropTable("personal-information");
  },
};
