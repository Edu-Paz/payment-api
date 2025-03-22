import axios from "axios";

const GATEWAY1_URL = "http://localhost:3001";
const GATEWAY2_URL = "http://localhost:3002";

export default {
    async processPayment(paymentData) {
        try {
            let response;
            const { amount, name, email, cardNumber, cvv, gateway } = paymentData;

            if (gateway === "gateway1") {
                response = await axios.post(`${GATEWAY1_URL}/transactions`, {
                    amount,
                    name,
                    email,
                    cardNumber,
                    cvv
                });
            } else if (gateway === "gateway2") {
                response = await axios.post(`${GATEWAY2_URL}/transacoes`, {
                    valor: amount,
                    nome: name,
                    email: email,
                    numeroCartao: cardNumber,
                    cvv: cvv
                });
            } else {
                throw new Error("Gateway de pagamento inválido");
            }

            return {
                success: true,
                data: response.data,
                gateway
            };
        } catch (error) {
            console.error('Erro no gateway:', error.response?.data || error.message);
            return {
                success: false,
                error: error.response?.data?.message || "Erro ao processar pagamento",
                gateway: paymentData.gateway
            };
        }
    },

    async processRefund(transactionId, gateway) {
        try {
            let response;

            if (gateway === "gateway1") {
                response = await axios.post(
                    `${GATEWAY1_URL}/transactions/${transactionId}/charge_back`
                );
            } else if (gateway === "gateway2") {
                response = await axios.post(
                    `${GATEWAY2_URL}/transacoes/reembolso`,
                    { id: transactionId }
                );
            } else {
                throw new Error("Gateway de pagamento inválido");
            }

            return {
                success: true,
                data: response.data
            };
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.message || "Erro ao processar reembolso"
            };
        }
    }
};
