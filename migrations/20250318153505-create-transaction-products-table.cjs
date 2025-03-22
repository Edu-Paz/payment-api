"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("transaction_products", {
            transaction_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: "transactions",
                    key: "id",
                },
                onDelete: "CASCADE",
            },
            product_id: {
                type: Sequelize.INTEGER,
                references: { model: "products", key: "id" },
                onDelete: "CASCADE",
            },
            quantity: {
                type: Sequelize.INTEGER,
                allowNull: false,
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
        await queryInterface.dropTable("transaction_products");
    },
};
