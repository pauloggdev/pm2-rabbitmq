import Matricula from "../../../domain/entity/Matricula";
import MatriculaRepository from "../../../domain/repository/MatriculaRepository";

export default class MatriculaRepositoryMemory implements MatriculaRepository{
    getAllEnrollPending(): Promise<any> {
        throw new Error("Method not implemented.");
    }
    matriculas:Array<any> = [];

    getByCode(code: string): Promise<any> {
        throw new Error("Method not implemented.");
    }
    update(matricula: Matricula): Promise<any> {
        throw new Error("Method not implemented.");
    }
    async save(matricula: any): Promise<void> {//+
        this.matriculas.push(matricula);
    }
}