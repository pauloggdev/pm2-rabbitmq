import MatriculaRepository from "../../domain/repository/MatriculaRepository";
import StudentRepository from "../../domain/repository/StudentRepository";
import CronJobService from "../../domain/repository/cronJobService";

export default class ValidatorStudentRegistrationSchedule implements CronJobService{
    constructor(
        readonly matriculaRepository: MatriculaRepository, 
        readonly studentRepository: StudentRepository
    ) { }
    async execute(params:any = null) {
        const matriculas = await this.matriculaRepository.getAllEnrollPending();
        for (let matricula of matriculas) {
            matricula.confirm();
            this.matriculaRepository.update(matricula);
        }
    }
}
