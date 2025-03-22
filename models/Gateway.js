import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Gateway = sequelize.define(
    "Gateway",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        is_active: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        priority: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        tableName: "gateways",
    }
);

export default Gateway;
