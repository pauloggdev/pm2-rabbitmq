import { InMemoryDepartmentRepository } from "../../../infra/repository/memory/InMemoryDepartmentRepository";
import { DepartamentRepository } from "domain/repository/DepartamentRepository";
import { CreateDepartmentUseCase } from "../../../application/usecase/CreateDepartmentUseCase";

describe('CreateDepartmentUseCase', () => {
    let departmentRepository: DepartamentRepository;
    let useCase: CreateDepartmentUseCase;

    beforeEach(() => {
        departmentRepository = new InMemoryDepartmentRepository();
        useCase = new CreateDepartmentUseCase(departmentRepository);
        departmentRepository.clear();
    });

    it('should create an department successfully', async () => {
        const input: any = {
            name: "Financeiro",
            type: 'department'
        };
        const output = await useCase.execute(input);
        expect(output).toHaveProperty("departmentId");
        const storedDepartment = await departmentRepository.findById(output.departmentId);
        expect(storedDepartment).toBeDefined();
        expect(storedDepartment?.name).toBe("Financeiro");
        expect(storedDepartment?.type).toBe("department");
    });

    it('should throw error if name is empty', async () => {
        const input: any = {
            name: "   ",
            type: "department"
        };

        await expect(useCase.execute(input)).rejects.toThrow("Nome inválido para departamento");
    });

});
