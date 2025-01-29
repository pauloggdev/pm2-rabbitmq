import Matricula from "../../domain/entity/Matricula";
import Student from "../../domain/entity/Student";
import MatriculaRepository from "../../domain/repository/MatriculaRepository";
import StudentRepository from "../../domain/repository/StudentRepository";

export default class EnrollStudent {
    constructor(
        readonly studentRepository: StudentRepository,
        readonly matriculaRepository: MatriculaRepository
    ) { }
    async execute(alunoId:string) {
        let student = await this.studentRepository.get(alunoId);
        if (!student) throw new Error("not found student");
        student = await Student.create(student.nome, student.email, student.docBI, student.getPassword());
        const enroll = Matricula.create(student.uuid);
        this.matriculaRepository.save(enroll);
    }
}