import { DepartamentRepository } from "domain/repository/DepartamentRepository";
import Connection from "../../db/Connection";
import Departament from "../../../domain/entity/Departament";

export default class InDatabaseDepartmentRepository implements DepartamentRepository {

    constructor(readonly connection: Connection) { }
    async save(departament: Departament): Promise<void> {
        await this.connection.query('insert into department (uuid, name, type, parentId) values (?,?,?,?)', [
            departament.id,
            departament.name,
            departament.type,
            departament.parentId,
        ]);
    }
    async findById(uuid: string): Promise<Departament | null> {
        const [department] = await this.connection.query("SELECT * FROM department WHERE uuid = ?", uuid);
        if (!department) return null;
        return new Departament(
            uuid,
            department.name,
            department.type,
            department.parentId,
        );
    }
    async findByName(name: string): Promise<Departament | null> {
        const [department] = await this.connection.query("SELECT * FROM department WHERE name = ?", name);
        if (!department) return null;
        return new Departament(
            department.uuid,
            department.name,
            department.type,
            department.parentId,
        );
    }

    async clear(): Promise<void> {
        await this.connection.query('delete from department', []);
    }
}