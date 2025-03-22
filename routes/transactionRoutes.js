import express from "express";
import { createTransaction, getTransactions, chargeBack } from "../controllers/transactionController.js";

const router = express.Router();

router.post("/transactions", createTransaction);
router.get("/transactions", getTransactions);
router.post("/:id/chargeback", chargeBack);

export default router;