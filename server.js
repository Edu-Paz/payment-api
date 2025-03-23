import express from "express";
import publicRoutes from "./routes/publicRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import transactionRoutes from "./routes/transactionRoutes.js";
const app = express();

// Middleware para processar JSON no corpo das requisições
app.use(express.json());

// Rotas públicas (sem autenticação)
app.use("/auth", publicRoutes);

// Rotas privadas (com autenticação)
app.use("/api/payments", paymentRoutes);
app.use("/api/transactions", transactionRoutes);

// Inicialização do servidor na porta 3000
app.listen(3000, () => {
    console.log("API rodando na porta 3000");
    console.log("Gateway 1 deve estar rodando na porta 3001");
    console.log("Gateway 2 deve estar rodando na porta 3002");
});
