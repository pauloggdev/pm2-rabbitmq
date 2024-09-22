import Student from "../../domain/entity/Student";
import StudentRepository from "../../domain/repository/StudentRepository";

export default class RegisterStudent{

    constructor(readonly studentRepository:StudentRepository){}
    async execute(input:InputDataRegisterStudent):Promise<void>{
        const student = Student.create(input.nome, input.email);
        this.studentRepository.save(student);
    }
}
export interface InputDataRegisterStudent{
    nome:string,
    email:string
}