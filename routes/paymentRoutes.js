import express from "express";
import paymentController from "../controllers/paymentController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

//Rota de pagamento (requer autenticação)
router.post("/purchase", async(req, res) => {
    const { amount, name, email, cardNumber, cvv } = req.body;

    try {
        // Buscar os gateways disponíveis e ordenar por prioridade
        const gateways = await Gateway.findAll({
            where: { is_active: true },
            order: [["priority", "ASC"]],
        });

        // Tentar processar com cada gateway
        for (let gateway of gateways) {
            const gatewayUrl = gateway.name === "gateway1" ? "http://localhost:3001" : "http://localhost:3002";
        }
            
    } catch (error) {
        console.error("Erro ao processar pagamento:", error);
        return res.status(500).json({ error: "Erro ao processar pagamento" });
    }
});

export default router;