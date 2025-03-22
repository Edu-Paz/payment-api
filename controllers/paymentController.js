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
                        ? "http://localhost:3001/transactions" // URL do gateway 1
                        : "http://localhost:3002/transactions"; // URL do gateway 2

                const requestData =
                    gateway.name === "gateway1"
                        ? {
                              // Dados para o gateway 1
                              amount,
                              name,
                              email,
                              cardNumber,
                              cvv,
                          }
                        : {
                              // Dados para o gateway 2
                              valor: amount,
                              nome: name,
                              email,
                              numeroCartao: cardNumber,
                              cvv,
                          };

                const headers =
                    gateway.name === "gateway2"
                        ? {
                              "Gateway-Auth-Token": "tk_f2198cc671b5289fa856", // Credenciais do Gateway 2
                              "Gateway-Auth-Secret":
                                  "3d15e8ed6131446ea7e3456728b1211f",
                          }
                        : {}; // Nenhum header necessário para o Gateway 1

                const response = await axios.post(gatewayUrl, requestData, {
                    headers,
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
