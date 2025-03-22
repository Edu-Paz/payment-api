import { Gateway } from "../models/index.js";
import axios from "axios";

const paymentController = {
    purchase: async (req, res) => {
        const { amount, name, email, cardNumber, cvv } = req.body;

        try {
            // Buscar gateways ativos ordenados por prioridade
            const gateways = await Gateway.findAll({
                where: { is_active: true },
                order: [["priority", "ASC"]],
            });

            for (let gateway of gateways) {
                const gatewayUrl =
                    gateway.name === "gateway1"
                        ? "http://localhost:3001/transactions"
                        : "http://localhost:3002/transactions";

                const response = await axios.post(gatewayUrl, {
                    amount,
                    name,
                    email,
                    cardNumber,
                    cvv,
                });

                if (response.status === 200) {
                    return res.json({
                        message: "Pagamento realizado com sucesso",
                        transactionId: response.data.id,
                    });
                }
            }

            // Se nenhum gateway aceitar o pagamento
            return res.status(400).json({
                error: "Todos os gateways falharam.",
            });
        } catch (error) {
            return res.status(500).json({
                error: "Erro ao processar o pagamento",
                error: error.message,
            });
        }
    },
};

export default paymentController;
