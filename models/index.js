import User from "./User.js";
import Gateway from "./Gateway.js";
import Client from "./Client.js";
import Product from "./Product.js";
import Transaction from "./Transaction.js";
import TransactionProduct from "./Transaction_Product.js";

// Relacionamentos
Transaction.belongsTo(Client, { foreignKey: "client_id" });
Transaction.belongsTo(Gateway, { foreignKey: "gateway_id" });

TransactionProduct.belongsTo(Transaction, { foreignKey: "transaction_id" });
TransactionProduct.belongsTo(Product, { foreignKey: "product_id" });

export { User, Gateway, Client, Product, Transaction, TransactionProduct };