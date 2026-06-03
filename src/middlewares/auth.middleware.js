
import jwt from "jsonwebtoken";

export function authMiddleware(req, res, next) {

    try {

        //le o header de autorização
        const authHeader = req.headers.authorization;


        //verifica se o header existe
        if (!authHeader) {
            return res.status(401).json({
                message: "Token de autenticação não fornecido",
            });
        }

        //extrai o token do header
        const [, token] = authHeader.split(" ");

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.user = {
            id: decoded.id,
            name: decoded.name,
            email: decoded.email,
            role: decoded.role,
        };
        next();
        } catch (error) {   
        return res.status(401).json({
            message: "Token de autenticação inválido",
        });
        }
}
