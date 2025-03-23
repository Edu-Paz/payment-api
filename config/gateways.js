// Configuração das URLs e endpoints dos gateways de pagamento
export const GATEWAY_URLS = {
    // Configuração do Gateway 1
    gateway1: {
        base: "http://localhost:3001",
        endpoints: {
            payment: "/transactions",
            chargeback: (id) => `/transactions/${id}/charge_back`
        }
    },
    // Configuração do Gateway 2
    gateway2: {
        base: "http://localhost:3002",
        endpoints: {
            payment: "/transacoes",
            chargeback: "/transacoes/reembolso"
        }
    }
}; 