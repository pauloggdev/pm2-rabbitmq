
import { v4 as uuidv4 } from 'uuid';
const bcrypt = require('bcrypt');

export default class Student{
    constructor(readonly uuid:string, readonly nome:string, readonly email:string, readonly docBI:any, private password:string){}
    static async create(nome:string, email:string, docBI:any, password:string):Promise<any>{

        const uuid = uuidv4();
        const passwordBcrypt = await bcrypt.hash('123', 10)
        return new Student(uuid, nome, email, docBI, passwordBcrypt)
    }
    getPassword(){
        return this.password;
    }
}