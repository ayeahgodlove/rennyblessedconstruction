'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable("employment-information", {
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
      
      occupation: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      employerName: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      employerAddress: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      employerPhone: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      educationBackground: {
        type: Sequelize.STRING(255),
        allowNull: false,
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

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable("employment-information");
  }
};
