import { InMemoryOwnerRepository } from "../../../infra/repository/memory/InMemoryOwnerRepository";
import { CreateOwnerUseCase } from "../../../application/usecase/CreateOwnerUseCase";
import OwnerRepository from "../../../domain/repository/OwnerRepository";
import MysqlConnection from "../../../infra/db/MysqlConnection";


const DB_HOST = process.env.DB_HOST || "";
const DB_USER = process.env.DB_USER || "";
const DB_PASS = process.env.DB_PASS || "";
const DB_DATABASE = process.env.DB_DATABASE || "";

const mysqlConnection = new MysqlConnection("localhost", "root", "root", "gest_doc");
describe('CreateOwnerUseCase', () => {
    let ownerRepository: OwnerRepository;
    let useCase: CreateOwnerUseCase;

    beforeEach(() => {
        ownerRepository = new InMemoryOwnerRepository();
        useCase = new CreateOwnerUseCase(ownerRepository);
        ownerRepository.clear();
    });

    it('should create an owner successfully', async () => {
        const input = {
            name: "Maria Silva",
            email: "maria@example.com"
        };

        const output = await useCase.execute(input);

        expect(output).toHaveProperty("ownerId");

        const storedOwner = await ownerRepository.findById(output.ownerId);
        expect(storedOwner).toBeDefined();
        expect(storedOwner?.name).toBe("Maria Silva");
        expect(storedOwner?.email).toBe("maria@example.com");
    });

    it('should throw error if name is empty', async () => {
        const input = {
            name: "   ",
            email: "maria@example.com"
        };

        await expect(useCase.execute(input)).rejects.toThrow("Owner name is required.");
    });

    it('should throw error if email is invalid', async () => {
        const input = {
            name: "Maria Silva",
            email: "invalid-email"
        };

        await expect(useCase.execute(input)).rejects.toThrow("Valid email is required.");
    });
});
