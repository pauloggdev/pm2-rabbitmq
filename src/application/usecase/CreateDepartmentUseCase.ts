import { CreateDepartamentInput } from "../../application/Dto/CreateDepartmentInput";
import Departament from "../../domain/entity/Departament";
import { DepartamentRepository } from "../../domain/repository/DepartamentRepository";

export class CreateDepartmentUseCase {
    constructor(private readonly departmentRepository: DepartamentRepository) { }
    async execute(input: CreateDepartamentInput): Promise<{ departmentId: string }> {
        const alreadyExists = await this.departmentRepository.findByName(input.name);
        if (alreadyExists) {
            throw new Error('Já existe um departamento com esse nome.');
        }
        const department = Departament.create(input.name, input.parentId);
        await this.departmentRepository.save(department);
        return { departmentId: department.id };
    }
}
