"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("transactions", {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            client_id: {
                type: Sequelize.INTEGER,
                references: { model: "clients", key: "id" },
            },
            gateway_id: {
                type: Sequelize.INTEGER,
                references: { model: "gateways", key: "id" },
            },
            external_id: {
                type: Sequelize.STRING,
            },
            status: {
                type: Sequelize.ENUM("pending", "approved", "failed", "refunded", "chargeback"),
                allowNull: false,
            },
            amount: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            card_last_numbers: {
                type: Sequelize.STRING(4),
            },
            createdAt: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.NOW,
            },
            updatedAt: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.NOW,
            },
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("transactions");
    },
};
