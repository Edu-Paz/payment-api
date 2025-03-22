import jwt from "jsonwebtoken";
import authConfig from "../config/auth.js"; // O segredo que você usa para assinar o JWT

export default function verifyToken(req, res, next) {
    const token = req.headers["authorization"];

    if (!token) {
        return res.status(403).json({ error: "Token não fornecido" });
    }

    jwt.verify(token, authConfig.secret, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: "Token inválido" });
        }

        // Adiciona as informações do usuário decodificadas no objeto da requisição
        req.userId = decoded.id;
        req.userRole = decoded.role;
        next();
    });
}
