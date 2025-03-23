import express from "express";
import transactionController from "../controllers/transactionController.js";

const router = express.Router();

// Listar todas as transações
router.get("/", transactionController.list);

// Listar uma transação por ID
router.get("/:id", transactionController.getById);

// Realizar chargeback/reembolso
router.post("/:id/chargeback", transactionController.chargeback);

export default router;
