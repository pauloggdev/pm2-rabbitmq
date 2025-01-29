import MatriculaRepository from "../../domain/repository/MatriculaRepository";
import StudentRepository from "../../domain/repository/StudentRepository";
import CronJobService from "../../domain/repository/cronJobService";

export default class ValidatorStudentRegistration implements CronJobService{
    constructor(readonly matriculaRepository: MatriculaRepository, readonly studentRepository: StudentRepository){}
    async execute(input:InputValidatorStudentRegistration){
        const student = await this.studentRepository.get(input.studentId);
        if(!student) throw new Error("Not found student");
        const matricula = await this.matriculaRepository.getByCode(input.codeRegistration);
        if(!matricula) throw new Error("Not found code registration");
        matricula.confirm();
        this.matriculaRepository.update(matricula);
    }
}
export interface InputValidatorStudentRegistration{
    studentId:string,
    codeRegistration:string
}