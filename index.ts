import * as express from 'express';
import 'tsconfig-paths/register';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

import MysqlConnection from './src/infra/db/MysqlConnection';
import EnrollStudent from   './src/application/usecase/enroll-student';
import RegisterStudent, { InputDataRegisterStudent } from   './src/application/usecase/register-student';
import ValidatorStudentRegistration, { InputValidatorStudentRegistration } from   './src/application/usecase/validator-student-registration';
import MatriculaRepositoryDatabase from './src/infra/repository/database/MatriculaRepositoryDatabase';
import StudentRepositoryDatabase from './src/infra/repository/database/StudentRepositoryDatabase';

const mysqlConnection = new MysqlConnection('localhost', 'root', 'root', 'escolas');

app.post('/enrollStudent', async function (req: any, res: any) {
    const studentRepository = new StudentRepositoryDatabase(mysqlConnection);
    const matriculaRepository = new MatriculaRepositoryDatabase(mysqlConnection);
    const enrollStudent  = new EnrollStudent(studentRepository, matriculaRepository);
    enrollStudent.execute(req.body.aluno_id);
    res.json({success: 'sucess'})

})
app.post('/registerStudent', async function (req: any, res: any) {

    const studentRepository = new StudentRepositoryDatabase(mysqlConnection);
    const registerStudent = new RegisterStudent(studentRepository);
    const inputDataRegisterStudent:InputDataRegisterStudent ={
        nome: req.body.nome,
        email: req.body.email
    }
    registerStudent.execute(inputDataRegisterStudent);
    res.json({success: 'sucess'})
})
app.put('/validatorStudentRegistration', async function (req: any, res: any) {

    const studentRepository = new StudentRepositoryDatabase(mysqlConnection);
    const matriculaRepository = new MatriculaRepositoryDatabase(mysqlConnection);
    const validatorStudent = new ValidatorStudentRegistration(matriculaRepository, studentRepository);
    const inputDataValidatorStudent:InputValidatorStudentRegistration ={
        studentId:req.body.aluno_id,
        codeRegistration:req.body.code
    }
    validatorStudent.execute(inputDataValidatorStudent);
    res.json({success: 'sucess'})
})
app.listen(3000, () => {
    console.log("Rodando o servidor localhost:3000");
});

