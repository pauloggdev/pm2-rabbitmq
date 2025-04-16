import { DepartamentRepository } from "domain/repository/DepartamentRepository";
import Departament from "domain/entity/Departament";

export class InMemoryDepartmentRepository implements DepartamentRepository {
    private departments: Departament[] = [];

    async save(department: Departament): Promise<void> {
        this.departments.push(department);
    }

    async findById(id: string): Promise<Departament | null> {
        return this.departments.find(dep => dep.id === id) || null;
    }

    async findByName(name: string): Promise<Departament | null> {
        return this.departments.find(dep => dep.name === name) || null;
    }
    async clear(): Promise<void> {
        this.departments = [];
    }
}
