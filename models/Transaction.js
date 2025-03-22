import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Transaction = sequelize.define(
    "Transaction",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        client_id: {
            type: DataTypes.INTEGER,
            references: { model: "Client", key: "id" },
        },
        gateway_id: {
            type: DataTypes.INTEGER,
            references: { model: "Gateway", key: "id" },
        },
        external_id: {
            type: DataTypes.STRING,
        },
        status: {
            type: DataTypes.ENUM("pending", "approved", "failed"),
            allowNull: false,
        },
        amount: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        card_last_numbers: {
            type: DataTypes.STRING(4),
        },
    },
    {
        tableName: "transactions",
    }
);

export default Transaction;
