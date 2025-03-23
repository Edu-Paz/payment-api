import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { User } from "../models/index.js";

export default {
    async login(req, res) {
        const { email, password } = req.body;

        try {
            // Verificar se o usuário existe
            const user = await User.findOne({ where: { email } });
            if (!user) {
                return res
                    .status(401)
                    .json({ error: "Usuário não encontrado" });
            }

            // Compara a senha digitada com a senha criptografada no banco de dados
            const isPasswordValid = await bcrypt.compare(
                password,
                user.password
            );
            if (!isPasswordValid) {
                return res.status(401).json({ error: "Senha incorreta!" });
            }

            const token = jwt.sign(
                { id: user.id },
                process.env.JWT_SECRET,
                { expiresIn: "1d" }
            );

            return res.json({
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                },
                token
            });
        } catch (error) {
            return res.status(500).json({ error: "Erro no login" });
        }
    }
};
