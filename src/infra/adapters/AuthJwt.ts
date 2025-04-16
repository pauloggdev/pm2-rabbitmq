import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Owner from '../../domain/entity/Owner';
import dotenv from 'dotenv';
import AuthService from '../../domain/ports/AuthService';
dotenv.config();
export class AuthJwt implements AuthService {
    async hashPassword(password: string): Promise<any> {
        return bcrypt.hash(password, 10);
    }
    async comparePassword(password: string, hash: string): Promise<any> {
        return bcrypt.compare(password, hash);
    }
    async generateToken(user: Owner): Promise<any> {
        const secretkey = process.env.JWT_SECRET || "!@$¨&ASDFG"
        const token = jwt.sign({ userId: user.id, userEmail: user.email }, secretkey, { expiresIn: '1h' });
        return token;
    }
    async verifyToken(token: string): Promise<any> {
        return jwt.verify(token, process.env.JWT_SECRET || "");
    }
   
}