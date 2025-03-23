import { body, validationResult } from 'express-validator';

// Middleware de validação para requisições de pagamento
export const validatePayment = [
    // Valida se o valor é um número inteiro positivo
    body('amount').isInt({ min: 1 }).withMessage('Valor deve ser positivo'),
    
    // Valida se o nome não está vazio
    body('name').isString().notEmpty().withMessage('Nome é obrigatório'),
    
    // Valida se o email está em formato correto
    body('email').isEmail().withMessage('Email inválido'),
    
    // Valida se o número do cartão tem 16 dígitos
    body('cardNumber').isLength({ min: 16, max: 16 }).withMessage('Cartão deve ter 16 dígitos'),
    
    // Valida se o CVV tem 3 dígitos
    body('cvv').isLength({ min: 3, max: 3 }).withMessage('CVV deve ter 3 dígitos'),
    
    // Middleware que verifica se houve erros de validação
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
]; 