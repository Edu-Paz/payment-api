import { Product, Transaction } from "../models/index.js";

export default {
    async purchase(req, res) {
        try {
            const { productId } = req.body;
            const userId = req.userId; // Pegamos do token JWT

            // Verifica se o produto existe
            const product = await Product.findByPk(productId);
            if (!product) {
                return res
                    .status(404)
                    .json({ error: "Produto não encontrado!" });
            }

            const transaction = await Transaction.create({
                userId,
                productId,
                status: "pending",
            });

            return res
                .status(201)
                .json({
                    message: "Compra realizada com sucesso!",
                    transaction,
                });
        } catch (error) {
            return res.status(500).json({ error: "Erro ao realizar compra." });
        }
    },
};
