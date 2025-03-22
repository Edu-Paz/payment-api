import express from "express";
import paymentController from "../controllers/paymentController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
const router = express.Router();

//Rota de compra
router.post("/purchase", authMiddleware, paymentController.purchase);

export default router;