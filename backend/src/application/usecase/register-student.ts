import Student from "../../domain/entity/Student";
import StudentRepository from "../../domain/repository/StudentRepository";

export default class RegisterStudent{

    constructor(readonly studentRepository:StudentRepository){}
    async execute(input:InputDataRegisterStudent):Promise<void>{
        const studentData = await this.studentRepository.getStudentByEmail(input.email);
        if(studentData) throw new Error("student already registered")
        const student = await Student.create(input.nome, input.email, input.docBI, input.password);
        this.studentRepository.save(student);
    }
}
export interface InputDataRegisterStudent{
    nome:string,
    email:string,
    docBI:any,
    password:string
}