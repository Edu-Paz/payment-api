"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert("clients", [
          {
            id: 1,
            name: "Eduardo Souza",
            email: "eduardo@email.com",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: 2,
            name: "Ana Pereira",
            email: "ana@email.com",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ]);
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("clients", null, {});
    },
};
