import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const User = sequelize.define(
    "User",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role: {
            type: DataTypes.ENUM("ADMIN", "MANAGER", "FINANCE", "USER"),
            allowNull: false,
        },
    },
    {
        tableName: "users", // 🔥 Define explicitamente o nome correto
    }
);

export default User;
