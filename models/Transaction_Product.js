import { DataTypes } from "sequelize";
import Transaction from "./Transaction.js";
import Product from "./Product.js";
import sequelize from "../config/database.js";

const TransactionProduct = sequelize.define("TransactionProduct", {
    transaction_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Transaction,
            key: "id",
        },
    },
    product_id: {
        type: DataTypes.INTEGER,
        references: { model: Product, key: "id" },
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    tableName: "transaction_products",
});

export default TransactionProduct;
