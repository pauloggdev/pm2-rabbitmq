import ValidatorStudentRegistrationSchedule from "../application/usecase/validator-student-registration-schedule";
import MysqlConnection from "../infra/db/MysqlConnection";
import MatriculaRepositoryDatabase from "../infra/repository/database/MatriculaRepositoryDatabase";
import StudentRepositoryDatabase from "../infra/repository/database/StudentRepositoryDatabase";
import NodeCron from "../infra/schedule/node-cron";

async function startConsumer() {
    const mysqlConnection = new MysqlConnection('localhost', 'root', 'root', 'escolas');
    const studentRepository = new StudentRepositoryDatabase(mysqlConnection);
    const matriculaRepository = new MatriculaRepositoryDatabase(mysqlConnection);
    const validatorStudentRegistration = new ValidatorStudentRegistrationSchedule(
        matriculaRepository, 
        studentRepository
    );
    const cronJob = new NodeCron(validatorStudentRegistration, 0, 12, 0, 0, 1);
    cronJob.scheduleJob();
}
startConsumer(); 
