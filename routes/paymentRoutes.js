import express from "express";
import paymentController from "../controllers/paymentController.js";
import { validatePayment } from '../middlewares/validateRequest.js';

const router = express.Router();

//Rota de compra
router.post("/purchase", validatePayment, paymentController.purchase);

export default router;