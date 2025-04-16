import { Request, Response, NextFunction } from 'express';
const jwt = require('jsonwebtoken');
require('dotenv').config();

const secretKey = process.env.JWT_SECRET || '!@$¨&ASDFG';

interface JwtPayload {
  ownerId: string;
}

// Middleware para verificar o token JWT
function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: 'Token não fornecido' });
  }
  const token = authHeader.split(' ')[1]; // Remove a palavra "Bearer" do token
  try {
    const decoded = jwt.verify(token, secretKey) as JwtPayload;
    req.body.ownerId = decoded.ownerId;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token inválido ou expirado' });
  }
}
export default authMiddleware;
