import { Request, Response, NextFunction } from 'express';
const jwt = require('jsonwebtoken');
require('dotenv').config();

const secretKey = process.env.JWT_SECRET || 'yourSecretKey';

interface JwtPayload {
  studentId: string;
}

// Middleware para verificar o token JWT
function authMiddleware(req: Request, res: Response, next: NextFunction) {
  // Extrair o token do cabeçalho Authorization (Bearer token)
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: 'Token não fornecido' });
  }

  const token = authHeader.split(' ')[1]; // Remove a palavra "Bearer" do token

  try {
    // Verificar o token
    const decoded = jwt.verify(token, secretKey) as JwtPayload;
    // Adicionar o payload decodificado ao objeto de requisição (req) para uso posterior
    req.body.studentId = decoded.studentId;

    //Passar o controle para o próximo middleware ou rota
    next();
  } catch (error) {
    // Retornar um erro 401 se o token for inválido
    res.status(401).json({ message: 'Token inválido ou expirado' });
  }
}

export default authMiddleware;
