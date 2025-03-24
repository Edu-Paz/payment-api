# Payment API - BeTalent Tech Test

API de gerenciamento de pagamentos multi-gateway desenvolvida para o teste técnico da BeTalent Tech.

## 📋 Requisitos

- Node.js (v14 ou superior)
- MySQL (v5.7 ou superior)
- NPM ou Yarn
- Docker (apenas para rodar os gateways mock)

## 🚀 Instalação e Configuração

1. **Clone o repositório**
```bash
git clone [url-do-repositorio]
cd payment-api
```

2. **Instale as dependências**
```bash
npm install
```
  ## 🐳 Instalação do Docker
  
  O Docker não é instalado com o `npm install`. Siga os passos abaixo para instalá-lo:
  
  ### Ubuntu/Debian
  ```bash
  # Remover versões antigas
  sudo apt-get remove docker docker-engine docker.io containerd runc
  
  # Atualizar apt e instalar dependências
  sudo apt-get update
  sudo apt-get install \
      ca-certificates \
      curl \
      gnupg \
      lsb-release
  
  # Adicionar chave GPG oficial do Docker
  curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
  
  # Configurar repositório estável
  echo \
    "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu \
    $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
  
  # Instalar Docker Engine
  sudo apt-get update
  sudo apt-get install docker-ce docker-ce-cli containerd.io
  
  # Verificar instalação
  sudo docker run hello-world
  ```
  
  ### Windows
  1. Baixe o Docker Desktop em https://www.docker.com/products/docker-desktop
  2. Execute o instalador
  3. Siga as instruções do assistente de instalação
  4. Reinicie o computador se solicitado
  
  ### macOS
  1. Baixe o Docker Desktop em https://www.docker.com/products/docker-desktop
  2. Arraste o Docker para a pasta Applications
  3. Clique duas vezes em Docker.app para iniciar
  
  ### Verificação da Instalação
  ```bash
  docker --version
  docker-compose --version
  ```
  
  Após a instalação do Docker, você pode prosseguir com a execução dos gateways mock conforme indicado nas instruções de instalação do projeto.

3. **Configure o arquivo .env**
```env
DB_HOST=localhost
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_DATABASE=payment_api
DB_PORT=3306
JWT_SECRET=meuSegredoSuperSeguro
JWT_EXPIRES_IN=1h
```

4. **Configure o banco de dados**
```bash
# Criar o banco de dados
npx sequelize-cli db:create

# Executar as migrations
npx sequelize-cli db:migrate

# Inserir dados iniciais
npx sequelize-cli db:seed:all
```

5. **Inicie os gateways mock**
```bash
docker run -p 3001:3001 -p 3002:3002 -e REMOVE_AUTH='true' matheusprotzen/gateways-mock
```

6. **Inicie a aplicação**
```bash
node server.js
```

## 🛣 Rotas da API

### Rotas Públicas

#### Login
```http
POST /auth/login
Content-Type: application/json

{
    "email": "admin@email.com",
    "password": "123456"
}
```
*Guardar token*

### Rotas Privadas (requerem token JWT)

#### Realizar Pagamento
# Utilizar token recebido pelo login
```http
POST /api/payments/purchase
Authorization: Bearer {token}
Content-Type: application/json

{
    "amount": 1000,
    "name": "Cliente Teste",
    "email": "cliente@teste.com",
    "cardNumber": "5569000000006063",
    "cvv": "010"
}
```

#### Listar Transações
# Utilizar token recebido pelo login
```http
GET /api/transactions
Authorization: Bearer {token}
```

#### Buscar Transação Específica
# Utilizar token recebido pelo login
```http
GET /api/transactions/{id}
Authorization: Bearer {token}
```

#### Realizar Reembolso
# Utilizar token recebido pelo login
```http
POST /api/transactions/{id}/chargeback
Authorization: Bearer {token}
```

## 🔍 Funcionalidades Implementadas (Nível 1)

- ✅ Autenticação via JWT
- ✅ Processamento de pagamentos com fallback entre gateways
- ✅ Validação de dados das requisições
- ✅ Persistência das transações no banco de dados
- ✅ Sistema de reembolso
- ✅ Listagem e consulta de transações

## 🧪 Cenários de Teste

### CVVs para Teste
- `010`: Pagamento aprovado no Gateway 1
- `100`: Falha no Gateway 1, sucesso no Gateway 2
- `200`: Falha em ambos os gateways

### Validações Implementadas
- Valor positivo para pagamentos
- Email válido
- Número de cartão com 16 dígitos
- CVV com 3 dígitos
- Token JWT válido para rotas privadas

## 🔒 Segurança

- Senhas armazenadas com hash (bcrypt)
- Autenticação via JWT
- Validação de dados em todas as requisições
- Tratamento de erros consistente
- Dados sensíveis protegidos no .env

## 📚 Tecnologias Utilizadas

- Express.js - Framework web
- Sequelize - ORM
- MySQL - Banco de dados
- JWT - Autenticação
- Express Validator - Validação de dados
- Axios - Requisições HTTP
- BCrypt - Hash de senhas

## ⚠️ Observações

- Implementação focada no nível 1 do teste
- Gateways configurados sem autenticação
- Valor da compra enviado diretamente via API

  ## 🤔 Dificuldades Encontradas

Durante o desenvolvimento deste projeto, enfrentei alguns desafios significativos:

1. **Docker e Gateways Mock**
   - A compreensão inicial do Docker e sua utilização foi desafiadora
   - Entender como os gateways mock funcionavam e como interagir com eles demandou tempo de aprendizado

2. **Implementação do Chargeback**
   - A lógica de reembolso exigiu um entendimento mais profundo do fluxo de pagamentos
   - Foi necessário garantir a consistência dos status das transações no banco de dados

3. **Autenticação JWT**
   - Primeira experiência com implementação de tokens JWT
   - O processo de configuração da autenticação e proteção das rotas foi complexo inicialmente
   - Compreender o fluxo de validação do token nas requisições demandou estudo adicional

## 🤝 Autor

Eduardo Paz Carvalho
- Email: eduardopazcarv@gmail.com
- LinkedIn: https://www.linkedin.com/in/eduardo-paz-141a64157/

## 📝 Licença

Este projeto está sob a licença MIT.
