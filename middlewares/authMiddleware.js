import jwt from "jsonwebtoken";
import authConfig from "../config/auth.js"; // O segredo que você usa para assinar o JWT

// Middleware para verificar autenticação via JWT
export default function verifyToken(req, res, next) {
    // Obtém o token do header da requisição
    const token = req.headers["authorization"];

    // Verifica se o token foi fornecido
    if (!token) {
        return res.status(403).json({ error: "Token não fornecido" });
    }

    // Verifica se o token é válido
    jwt.verify(token, authConfig.secret, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: "Token inválido" });
        }

        // Adiciona informações do usuário decodificadas na requisição
        req.userId = decoded.id;
        req.userRole = decoded.role;
        next();
    });
}
