import express from "express";
import router from express.Router();
import authController from "../controllers/authController.js";

router.post("/login", authController.login);

export default router;