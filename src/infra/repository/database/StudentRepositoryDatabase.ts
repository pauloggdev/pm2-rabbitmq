import Student from "../../../domain/entity/Student";
import Connection from "../../db/Connection";
import StudentRepository from "../../../domain/repository/StudentRepository";

export default class StudentRepositoryDatabase implements StudentRepository {

    constructor(readonly connection: Connection) { }
    async get(uuid: string): Promise<Student> {
        const [student] = await this.connection.query("SELECT * FROM students WHERE uuid = ?", uuid);
        return new Student(uuid, student.nome, student.email);
    }
    async save(student: Student): Promise<void> {
        this.connection.query("insert into students (uuid, nome, email) values (?,?,?)", [
            student.uuid,
            student.nome,
            student.email
        ]);
    }

}