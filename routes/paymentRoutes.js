import express from "express";
import paymentController from "../controllers/paymentController.js";

const router = express.Router();

//Rota de compra
router.post("/purchase", paymentController.purchase);

export default router;