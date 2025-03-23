import axios from "axios";
import { Transaction } from "../models/index.js";
import { GATEWAY_URLS } from "../config/gateways.js";

const paymentController = {
    // Método para processar pagamentos
    async purchase(req, res) {
        // Extrai dados do corpo da requisição
        const { amount, name, email, cardNumber, cvv } = req.body;

        try {
            // Tenta Gateway 1
            try {
                console.log("Tentando Gateway 1...");
                // Faz requisição para o Gateway 1
                const response = await axios.post(
                    GATEWAY_URLS.gateway1.base + GATEWAY_URLS.gateway1.endpoints.payment,
                    {
                        amount,
                        name,
                        email,
                        cardNumber,
                        cvv
                    }
                );

                // Valida resposta do Gateway 1
                if (!response.data || !response.data.id) {
                    throw new Error("Resposta inválida do Gateway 1");
                }

                // Cria registro da transação no banco
                const transaction = await Transaction.create({
                    client: name,
                    gateway: "gateway1",
                    external_id: response.data.id,
                    status: "approved",
                    amount,
                    card_last_numbers: cardNumber.slice(-4)
                });

                // Retorna sucesso
                return res.json({
                    success: true,
                    message: "Pagamento realizado com sucesso via Gateway 1",
                    transaction
                });

            } catch (g1Error) {
                console.log("Gateway 1 falhou, tentando Gateway 2...");
                console.log("Erro Gateway 1:", error.response?.data || error.message);

                try {
                    // Se Gateway 1 falhar, tenta Gateway 2
                    const response = await axios.post(
                        GATEWAY_URLS.gateway2.base + GATEWAY_URLS.gateway2.endpoints.payment,
                        {
                            valor: amount,
                            nome: name,
                            email,
                            numeroCartao: cardNumber,
                            cvv
                        }
                    );

                    if (!response.data || !response.data.id) {
                        throw new Error("Resposta inválida do Gateway 2");
                    }

                    // Cria registro da transação no banco
                    const transaction = await Transaction.create({
                        client: name,
                        gateway: "gateway2",
                        external_id: response.data.id,
                        status: "approved",
                        amount,
                        card_last_numbers: cardNumber.slice(-4)
                    });

                    // Retorna sucesso
                    return res.json({
                        success: true,
                        message: "Pagamento realizado com sucesso via Gateway 2",
                        transaction
                    });

                } catch (g2Error) {
                    // Ambos os gateways falharam
                    console.log("Gateway 2 também falhou");
                    return res.status(400).json({
                        success: false,
                        message: "Pagamento recusado em ambos os gateways",
                        errors: {
                            gateway1: g1Error.response?.data,
                            gateway2: g2Error.response?.data
                        }
                    });
                }
            }
        } catch (error) {
            // Se ambos os gateways falharem
            console.log("Erro final:", error.response?.data || error.message);
            
            return res.status(400).json({
                success: false,
                message: "Falha no pagamento em ambos os gateways",
                error: error.response?.data?.message || error.message
            });
        }
    }
};

export default paymentController;
