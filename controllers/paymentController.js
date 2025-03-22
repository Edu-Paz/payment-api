import paymentService from "../services/paymentService.js";
import { Gateway, Transaction } from "../models/index.js";

export default {
    async pay(req, res) {
        try {
            console.log('1. Iniciando processamento de pagamento');
            console.log('Dados recebidos:', req.body);
            console.log('User ID:', req.userId);
            
            const { amount, name, email, cardNumber, cvv } = req.body;
            const userId = req.userId; // Pega o ID do usuário autenticado

            // Validação dos campos obrigatórios
            if (!amount || !name || !email || !cardNumber || !cvv) {
                console.log('2. Erro: Campos obrigatórios faltando');
                return res.status(400).json({ 
                    error: "Todos os campos são obrigatórios" 
                });
            }

            console.log('3. Buscando gateways ativos');
            // Busca os gateways ativos ordenados por prioridade
            const gateways = await Gateway.findAll({
                where: { is_active: true },
                order: [['priority', 'ASC']]
            });
            console.log('Gateways encontrados:', gateways);

            if (gateways.length === 0) {
                console.log('4. Erro: Nenhum gateway disponível');
                return res.status(400).json({ 
                    error: "Nenhum gateway de pagamento disponível" 
                });
            }

            let successfulPayment = null;

            console.log('5. Iniciando tentativas de pagamento nos gateways');
            // Tenta processar o pagamento em cada gateway até obter sucesso
            for (const gateway of gateways) {
                console.log(`Tentando gateway: ${gateway.name}`);
                const paymentResult = await paymentService.processPayment({
                    name,
                    email,
                    cardNumber,
                    cvv,
                    amount,
                    gateway: gateway.name.toLowerCase().replace(" ", "")
                });
                console.log('Resultado do gateway:', paymentResult);

                if (paymentResult.success) {
                    successfulPayment = {
                        ...paymentResult,
                        gatewayId: gateway.id
                    };
                    console.log('6. Pagamento bem-sucedido no gateway');
                    break;
                }
            }

            if (!successfulPayment) {
                console.log('7. Erro: Todos os gateways rejeitaram');
                return res.status(400).json({ 
                    error: "Pagamento rejeitado por todos os gateways" 
                });
            }

            console.log('8. Registrando transação no banco');
            // Registra a transação no banco
            const transaction = await Transaction.create({
                client_id: userId,
                gateway_id: successfulPayment.gatewayId,
                external_id: successfulPayment.data.id,
                status: "approved",
                amount: amount,
                card_last_numbers: cardNumber.slice(-4)
            });

            console.log('9. Transação registrada com sucesso');
            return res.status(200).json({
                message: "Pagamento realizado com sucesso!",
                transaction
            });
        } catch (error) {
            console.error('❌ Erro detalhado:', {
                message: error.message,
                stack: error.stack,
                name: error.name
            });
            return res.status(500).json({ 
                error: "Erro ao processar pagamento.",
                details: error.message 
            });
        }
    }
};
