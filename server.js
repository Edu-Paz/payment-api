import express from "express";
import purchaseRoutes from "./routes/purchaseRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import transactionRoutes from "./routes/transactionRoutes.js";

const app = express();

app.use(express.json());

// Roteamento das rotas de autenticação, pagamentos e transações
app.use("/purchase", purchaseRoutes);
app.use("/payments", paymentRoutes);
app.use("/transactions", transactionRoutes);

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
