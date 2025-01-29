import StudentRepository from "../../domain/repository/StudentRepository";

export default class GetAllStudents{
    constructor(readonly studentRepository: StudentRepository){}
    async execute(page:any, search:any){
        return await this.studentRepository.getAll(page, search);
    }
}