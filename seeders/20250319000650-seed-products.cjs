"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert("products", [
            {
                name: "Notebook",
                amount: 500000, // Valor em centavos (R$5000,00)
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: "Mouse",
                amount: 5000, // R$50,00
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("products", null, {});
    },
};
