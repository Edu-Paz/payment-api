"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert("transaction_products", [
            {
                transaction_id: 1, // Transação ID 1
                product_id: 1, // Produto ID 1 (Notebook)
                quantity: 1,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                transaction_id: 1,
                product_id: 2, // Produto ID 2 (Mouse)
                quantity: 1,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("transaction_products", null, {});
    },
};
