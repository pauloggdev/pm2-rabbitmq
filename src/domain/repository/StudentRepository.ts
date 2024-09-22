import Student from "../entity/Student";

export default interface StudentRepository{
    get(uuid:string):Promise<Student>;
    save(student: Student): Promise<void>;
}