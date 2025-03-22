import { Router } from "express";
import transactionController from "../controllers/transactionController.js";  // Importa o controlador de transações

const router = Router();

// Definindo as rotas para as transações
router.get("/", transactionController.listTransactions);    // Listar todas as transações
router.get("/:id", transactionController.getTransactionStatus);  // Consultar uma transação específica
router.post("/:id/chargeback", transactionController.chargeback);  // Processar chargeback/reembolso

export default router;
