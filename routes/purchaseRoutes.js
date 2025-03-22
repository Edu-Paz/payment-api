import express from "express";
import purchaseController from "../controllers/purchaseController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

//Rota de compra (requer autenticação)
router.post("/purchase", authMiddleware, purchaseController.purchase);

export default router;