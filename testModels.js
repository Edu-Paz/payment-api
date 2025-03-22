import sequelize from './config/database.js';
import User from './models/User.js';
import Client from './models/Client.js';
import Product from './models/Product.js';
import Gateway from './models/Gateway.js';
import Transaction from './models/Transaction.js';
import TransactionProduct from './models/Transaction_Product.js';
import dotenv from 'dotenv';
dotenv.config();

async function testDatabase() {
  try {
    await sequelize.authenticate();
    console.log('Conexão bem-sucedida!');
    console.log("Banco de dados conectado:", sequelize.getDatabaseName());

    // Criar um usuário de teste
    const user = await User.create({
      email: 'teste@email.com',
      password: '123456',
      role: 'ADMIN'
    });

    console.log('Usuário criado:', user.toJSON());

    // Criar um cliente de teste
    const client = await Client.create({
      name: 'João Silva',
      email: 'joao@email.com'
    });

    console.log('Cliente criado:', client.toJSON());

    // Criar um produto de teste
    const product = await Product.create({
      name: 'Teclado Mecânico',
      amount: 15000 // 150,00 reais
    });

    console.log('Produto criado:', product.toJSON());

  } catch (error) {
    console.error('Erro ao testar os models:', error);
  } finally {
    await sequelize.close();
  }
}

testDatabase();
