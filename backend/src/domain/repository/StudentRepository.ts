import Student from "../entity/Student";

export default interface StudentRepository{
    get(uuid:string):Promise<Student>;
    getAll(page:any, search:any):Promise<any>;
    getStudent(email:string):Promise<Student|null>;
    getStudentByEmail(email:string):Promise<Student|null>;
    save(student: Student): Promise<void>;
}