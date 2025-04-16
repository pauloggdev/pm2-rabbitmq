import AuthService from "../../domain/ports/AuthService";
import Owner from "../../domain/entity/Owner";
import OwnerRepository from "../../domain/repository/OwnerRepository";
import { CreateOwnerInput } from "../Dto/CreateOwnerInput";
import { CreateOwnerOutput } from "../Dto/CreateOwnerOutput";



export class CreateOwnerUseCase {
    constructor(private readonly ownerRepository: OwnerRepository, private readonly authService:AuthService) { }

    async execute(input: CreateOwnerInput): Promise<CreateOwnerOutput> {
        const user = await this.ownerRepository.findByEmail(input.email);
        if (user) throw new Error("User já cadastrado")
        const password = await this.authService.hashPassword(input.password);
        const owner = Owner.create(input.name, input.email, password);
        await this.ownerRepository.save(owner);
        return { ownerId: owner.id };
    }
}
