import axios from 'axios';

async function testPayment() {
    try {
        console.log('🔄 Testando pagamento...');
        
        // Primeiro faz login para obter o token
        const loginResponse = await axios.post('http://localhost:3000/auth/login', {
            email: "admin@email.com",
            password: "123456"
        });

        const token = loginResponse.data.token;

        // Tenta fazer um pagamento
        const paymentResponse = await axios.post('http://localhost:3000/api/pay', 
            {
                amount: 1000,  // R$ 10,00 em centavos
                name: "Cliente Teste",
                email: "cliente@teste.com",
                cardNumber: "5569000000006063",
                cvv: "010"
            },
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        );

        console.log('✅ Resultado do pagamento:', paymentResponse.data);
    } catch (error) {
        console.error('❌ Erro:', error.response?.data || error.message);
    }
}

testPayment();
