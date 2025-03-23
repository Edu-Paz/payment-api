import { Transaction } from "../models/index.js";  // Importa o modelo de Transação
import axios from "axios";
import { GATEWAY_URLS } from "../config/gateways.js";

const transactionController = {
    // Listar todas as transações
    async list(req, res) {
        try {
            const transactions = await Transaction.findAll();
            return res.status(200).json(transactions);
        } catch (error) {
            return res.status(500).json({
                error: "Erro ao listar transações",
                details: error.message,
            });
        }
    },

    // Detalhes de uma transação
    async getById(req, res) {
        try {
            const transaction = await Transaction.findByPk(req.params.id);
            if (!transaction) {
                return res.status(404).json({ error: "Transação não encontrada" });
            }

            return res.status(200).json(transaction);
        } catch (error) {
            return res.status(500).json({
                error: "Erro ao consultar transação",
                details: error.message,
            });
        }
    },

    // Realizar chargeback/reembolso
    async chargeback(req, res) {
        try {
            const { id } = req.params;
            const transaction = await Transaction.findByPk(id);

            if (!transaction) {
                return res.status(404).json({ error: "Transação não encontrada" });
            }

            // Tenta realizar o chargeback no gateway apropriado
            try {
                if (transaction.gateway === "gateway1") {
                    const url = GATEWAY_URLS.gateway1.base + 
                              GATEWAY_URLS.gateway1.endpoints.chargeback(transaction.external_id);
                    await axios.post(url);
                } else {
                    const url = GATEWAY_URLS.gateway2.base + 
                              GATEWAY_URLS.gateway2.endpoints.chargeback;
                    await axios.post(url, { id: transaction.external_id });
                }

                // Atualiza o status da transação
                transaction.status = "refunded";
                await transaction.save();

                return res.json({
                    success: true,
                    message: "Reembolso realizado com sucesso",
                    transaction
                });
            } catch (error) {
                return res.status(400).json({
                    success: false,
                    message: "Erro ao processar reembolso no gateway",
                    error: error.message
                });
            }
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Erro ao processar reembolso",
                error: error.message
            });
        }
    },
};

export default transactionController;
