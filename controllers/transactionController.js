import { Transaction } from "../models/index.js";  // Importa o modelo de Transação

const transactionController = {
    // Listar todas as transações
    listTransactions: async (req, res) => {
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

    // Consultar uma transação específica
    getTransactionStatus: async (req, res) => {
        const { id } = req.params;  // ID da transação como parâmetro

        try {
            const transaction = await Transaction.findByPk(id);

            if (!transaction) {
                return res.status(404).json({
                    error: "Transação não encontrada",
                });
            }

            return res.status(200).json(transaction);
        } catch (error) {
            return res.status(500).json({
                error: "Erro ao consultar transação",
                details: error.message,
            });
        }
    },

    // Realizar chargeback (reembolso) - apenas atualiza o status da transação
    chargeback: async (req, res) => {
        const { id } = req.params;  // ID da transação como parâmetro

        try {
            const transaction = await Transaction.findByPk(id);

            if (!transaction) {
                return res.status(404).json({
                    error: "Transação não encontrada",
                });
            }

            // Atualizar o status da transação para "CHARGEBACK"
            transaction.status = "CHARGEBACK";  // Indicando que a transação foi revertida
            await transaction.save();

            return res.status(200).json({
                message: "Transação revertida (chargeback) com sucesso",
                transaction,
            });
        } catch (error) {
            return res.status(500).json({
                error: "Erro ao processar chargeback",
                details: error.message,
            });
        }
    },
};

export default transactionController;
