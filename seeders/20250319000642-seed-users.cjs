"use strict";

const bcrypt = require("bcryptjs");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        // Criptografando as senhas antes de inseri-las
        const hashedPasswordAdmin = await bcrypt.hash("123456", 10);
        const hashedPasswordManager = await bcrypt.hash("123456", 10);
        const hashedPasswordFinance = await bcrypt.hash("123456", 10);
        const hashedPasswordUser = await bcrypt.hash("123456", 10);

        await queryInterface.bulkInsert(
            "users",
            [
                {
                    email: "admin@email.com",
                    password: hashedPasswordAdmin,
                    role: "ADMIN",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    email: "manager@email.com",
                    password: hashedPasswordManager,
                    role: "MANAGER",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    email: "finance@email.com",
                    password: hashedPasswordFinance,
                    role: "FINANCE",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    email: "user@email.com",
                    password: hashedPasswordUser,
                    role: "USER",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            ],
        );
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("users", null, {});
    },
};
