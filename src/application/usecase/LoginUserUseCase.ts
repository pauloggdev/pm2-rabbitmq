import AuthService from 'domain/ports/AuthService';
import { LoginInputDto } from '../../application/Dto/LoginInputDto';
import OwnerRepository from '../../domain/repository/OwnerRepository';

export default class LoginUserUseCase {
    constructor(private ownerRepository: OwnerRepository, private authService: AuthService) { }
    async execute(input: LoginInputDto): Promise<any> {
        if (!input.email || !input.password) throw new Error("Provide email or password field");
        const user = await this.ownerRepository.findByEmail(input.email);
        if (!user) throw new Error("User not found")
        const isMatch = await this.authService.comparePassword(input.password, user.password);
        if (!isMatch) throw new Error("not authenticated");
        const token = await this.authService.generateToken(user)
        return {
            token: token,
        };
    }
}