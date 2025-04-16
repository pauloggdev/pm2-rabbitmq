import Owner from "../../domain/entity/Owner";

export default interface AuthService {
    hashPassword(password: string):  Promise<any>;
    comparePassword(password: string, hash: string):  Promise<any>;
    generateToken(user: Owner): Promise<any>;
    verifyToken(token: string): Promise<any>;
}
