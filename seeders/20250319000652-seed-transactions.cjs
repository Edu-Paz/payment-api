"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert("transactions", [
            {
                client_id: 1, // Cliente ID 1 (Eduardo Souza)
                gateway_id: 1, // Gateway ID 1 (Gateway 1)
                external_id: "txn_001",
                status: "pending",
                amount: 505000, // R$5050,00
                card_last_numbers: "6063",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("transactions", null, {});
    },
};
