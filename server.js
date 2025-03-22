import express from "express";
import authRoutes from "./routes/authRoutes.js";
import purchaseRoutes from "./routes/purchaseRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";

const app = express();

app.use(express.json());

app.use("/auth", authRoutes);
app.use("/api", purchaseRoutes);
app.use("/api", paymentRoutes);

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});