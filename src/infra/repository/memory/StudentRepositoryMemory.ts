import Student from "../../../domain/entity/Student";
import StudentRepository from "../../../domain/repository/StudentRepository";

export default class StudentRepositoryMemory implements StudentRepository{
    student:Array<Student> = [];
    async get(uuid: string): Promise<Student> {
        return this.student.find(s => s.uuid === uuid) || Promise.reject(new Error("not found student"));
    }
    async save(student: Student): Promise<void> {//+
        this.student.push(student);
    }
}