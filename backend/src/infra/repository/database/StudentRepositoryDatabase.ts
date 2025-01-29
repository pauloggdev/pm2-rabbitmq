import Student from "../../../domain/entity/Student";
import Connection from "../../db/Connection";
import StudentRepository from "../../../domain/repository/StudentRepository";

export default class StudentRepositoryDatabase implements StudentRepository {
    constructor(readonly connection: Connection) { }
    async get(uuid: string): Promise<Student> {
        const [student] = await this.connection.query("SELECT * FROM students WHERE uuid = ?", uuid);
        return new Student(uuid, student.nome, student.email, student.docBI, student.getPassword());
    }
    async getStudent(email: string): Promise<any> {
        const [student] = await this.connection.query("SELECT * FROM students WHERE email = ?", [
            email
        ]);
        if (!student) return null;
        return new Student(student.uuid, student.nome, student.email, student.docBI, student.password);
    }
    async getStudentByEmail(email: string): Promise<any> {
        const [student] = await this.connection.query("SELECT * FROM students WHERE email = ? LIMIT 1", [
            email
        ]);
        if (!student) return null;
        return new Student(student.uuid, student.nome, student.email, student.docBI, student.password);
    }
    async save(student: Student): Promise<void> {
        this.connection.query("insert into students (uuid, nome, email, docBI, password) values (?,?,?,?,?)", [
            student.uuid,
            student.nome,
            student.email,
            student.docBI,
            student.getPassword()
        ]);
    }
    async getAll(page: any = 1, search:any): Promise<any> {
        const limit: any = 3;
        const searchTerm = `%${search}%`;
        const offset = (page - 1) * limit; // Cálculo do offset
        const [totalCountRow] = await this.connection.query(`SELECT COUNT(*) as total FROM students`, []);
        const totalCount = totalCountRow.total;
        let queryParams = [limit, offset];
        let query = `SELECT * FROM students`;
        if (search) {
            query += ` WHERE nome LIKE ?`;
            queryParams.unshift(searchTerm);
        }
        query += ` LIMIT ? OFFSET ?`;
        const studentsData = await this.connection.query(query, queryParams);
        const totalPages = Math.ceil(totalCount / limit);
        return {
            students: studentsData, // Dados dos estudantes
            totalPages: totalPages,  // Número total de páginas
            currentPage: page        // Página atual
        };
    }

}