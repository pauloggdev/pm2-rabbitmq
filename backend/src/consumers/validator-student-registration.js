"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validator_student_registration_schedule_1 = __importDefault(require("../application/usecase/validator-student-registration-schedule"));
const MysqlConnection_1 = __importDefault(require("../infra/db/MysqlConnection"));
const MatriculaRepositoryDatabase_1 = __importDefault(require("../infra/repository/database/MatriculaRepositoryDatabase"));
const StudentRepositoryDatabase_1 = __importDefault(require("../infra/repository/database/StudentRepositoryDatabase"));
const node_cron_1 = __importDefault(require("../infra/schedule/node-cron"));
function startConsumer() {
    return __awaiter(this, void 0, void 0, function* () {
        const mysqlConnection = new MysqlConnection_1.default('localhost', 'root', 'root', 'escolas');
        const studentRepository = new StudentRepositoryDatabase_1.default(mysqlConnection);
        const matriculaRepository = new MatriculaRepositoryDatabase_1.default(mysqlConnection);
        const validatorStudentRegistration = new validator_student_registration_schedule_1.default(matriculaRepository, studentRepository);
        const cronJob = new node_cron_1.default(validatorStudentRegistration, 0, 12, 0, 0, 1);
        cronJob.scheduleJob();
    });
}
startConsumer();
