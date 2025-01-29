import Matricula from "../entity/Matricula";

export default interface MatriculaRepository{
    save(data:any):Promise<void>;
    getByCode(code:string):Promise<any>;
    getAllEnrollPending():Promise<any>;
    update(matricula:Matricula):Promise<any>;
}