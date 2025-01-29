import Student from "../../domain/entity/Student";
import StudentRepository from "../../domain/repository/StudentRepository";

export default class GetStudentAuth{
    constructor(readonly studentRepository: StudentRepository){}
    async execute(email:string):Promise<Student|null>{
        return await this.studentRepository.getStudent(email);
    }
}