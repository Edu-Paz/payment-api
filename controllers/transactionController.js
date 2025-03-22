import axios from "axios";
import { Transaction } from "../models/index.js";

const GATEWAY_1_URL = "http://localhost:3001";
const GATEWAY_2_URL = "http://localhost:3002";
const GATEWAY_2_AUTH = {
  "Gateway-Auth-Token": "tk_f2198cc671b5289fa856",
  "Gateway-Auth-Secret": "3d15e8ed6131446ea7e3456728b1211f",
};

const createTransaction = async (req, res) => {
  try {
    const { amount, name, email, cardNumber, cvv } = req.body;

    let gateway, response;

    if (cardNumber.startsWith("4") || cardNumber.startsWith("5")) {
      // Gateway 1
      response = await axios.post(`${GATEWAY_1_URL}/transactions`, {
        amount,
        name,
        email,
        cardNumber,
        cvv,
      });

      gateway = "GATEWAY_1";
    } else {
      // Gateway 2
      response = await axios.post(
        `${GATEWAY_2_URL}/transacoes`,
        {
          valor: amount,
          nome: name,
          email,
          numeroCartao: cardNumber,
          cvv,
        },
        { headers: GATEWAY_2_AUTH }
      );

      gateway = "GATEWAY_2";
    }

    const transaction = await Transaction.create({
      client: name,
      gateway,
      external_id: response.data.id,
      status: "APPROVED",
      amount,
      card_last_numbers: cardNumber.slice(-4),
    });

    return res.status(201).json(transaction);
  } catch (error) {
    console.error("Erro ao criar transação:", error);
    return res.status(500).json({ error: "Erro ao processar transação" });
  }
};

const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.findAll();
    return res.json(transactions);
  } catch (error) {
    console.error("Erro ao buscar transações:", error);
    return res.status(500).json({ error: "Erro ao buscar transações" });
  }
};

const chargeBack = async (req, res) => {
  try {
    const { id } = req.params;

    const transaction = await Transaction.findByPk(id);

    if (!transaction) {
      return res.status(404).json({ error: "Transação não encontrada" });
    }

    let response;
    if (transaction.gateway === "GATEWAY_1") {
      response = await axios.post(`${GATEWAY_1_URL}/transactions/${transaction.external_id}/charge_back`);
    } else {
      response = await axios.post(`${GATEWAY_2_URL}/transacoes/reembolso`, { id: transaction.external_id }, { headers: GATEWAY_2_AUTH });
    }

    transaction.status = "REFUNDED";
    await transaction.save();

    return res.json({ message: "Chargeback realizado com sucesso", response: response.data });
  } catch (error) {
    console.error("Erro ao processar chargeback:", error);
    return res.status(500).json({ error: "Erro ao processar chargeback" });
  }
};

export { createTransaction, getTransactions, chargeBack };
