import Matricula from "../../../domain/entity/Matricula";
import Connection from "../../db/Connection";
import MatriculaRepository from "../../../domain/repository/MatriculaRepository";

export default class MatriculaRepositoryDatabase implements MatriculaRepository{
    constructor(readonly connection: Connection){}
    
 
    async getByCode(code: string): Promise<any> {
        const [matricula] = await this.connection.query("select * from matriculas where code = ?", code);
        return new Matricula(matricula.uuid, matricula.aluno_id, code, matricula.status)
    }
    async save(matricula: Matricula): Promise<void> {
        this.connection.query('insert into matriculas (uuid, aluno_id, code, status) values (?,?,?,?)', [
            matricula.uuid,
            matricula.aluno_id,
            matricula.getCode(),
            matricula.getStatus() 
        ]);
    }
    async update(matricula: Matricula): Promise<any> {
        this.connection.query('UPDATE matriculas SET status = ? WHERE aluno_id = ? and code = ?', [
            matricula.getStatus(),
            matricula.aluno_id,
            matricula.getCode() 
        ])
    }
    async getAllEnrollPending(): Promise<any> {
        const matriculas:Array<Matricula> = [];
        const matriculasDatabase = await this.connection.query("select * from matriculas where status = ? limit 1", 'pending');
        for(let matricula of matriculasDatabase){
            matriculas.push(new Matricula(matricula.uuid, matricula.aluno_id, matricula.code, matricula.status))
        }
        return matriculas;
    }

}