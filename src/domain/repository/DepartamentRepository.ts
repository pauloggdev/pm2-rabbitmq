import Departament from "../../domain/entity/Departament";

export interface DepartamentRepository {
    save(departament: Departament): Promise<void>;
    findById(uuid: string): Promise<Departament | null>;
    findByName(name: string): Promise<Departament | null>;
    clear(): Promise<void>;
}
