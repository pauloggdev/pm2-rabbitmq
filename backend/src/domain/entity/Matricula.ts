import { v4 as uuidv4 } from 'uuid';

export default class Matricula{
    constructor(readonly uuid:string, readonly aluno_id:string, public code:string,public status:string){}
    static create(aluno_id:string){
        const uuid = uuidv4();
        const status = 'pending';
        const code = `${Math.floor(Math.random() * 1000)}`;
        return new Matricula(uuid, aluno_id, code, status)
    }
    getStatus(){
        return this.status;
    }
    confirm(){
        this.status = 'confirmed';
    }
    getCode(){
        return this.code;
    }
}


