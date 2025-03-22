"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert("gateways", [
            {
                name: "Gateway 1",
                is_active: true,
                priority: 1,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: "Gateway 2",
                is_active: true,
                priority: 2,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("gateways", null, {});
    },
};
