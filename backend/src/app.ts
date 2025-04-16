import express from 'express';
import MysqlConnection from './infra/db/MysqlConnection';
import InDatabaseOwnerRepository from './infra/repository/database/InDatabaseOwnerRepository';
import InDatabaseDocumentRepository from './infra/repository/database/InDabataseDocumentRepository';
import { CloudinaryFileStorage } from './infra/adapters/CloudinaryFileStorage';
import LoginController from './controllers/LoginController';
import OwnerController from './controllers/OwnerController';
import DepartmentController from './controllers/DepartmentController';
import InDatabaseDepartmentRepository from './infra/repository/database/InDabataseDepartmentRepository';
import DocumentController from './controllers/DocumentController';
import { AuthJwt } from './infra/adapters/AuthJwt';
import AuthenticateToken from './middlewares/AuthenticateToken'

//const { createClient } = require('redis')
//const client = createClient();
const cors = require('cors');
require('dotenv').config();
const path = require('path');
const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())
app.use(express.static(path.join(__dirname, '../public')));

const DB_HOST = process.env.DB_HOST || "";
const DB_USER = process.env.DB_USER || "";
const DB_PASS = process.env.DB_PASS || "";
const DB_DATABASE = process.env.DB_DATABASE || "";

const mysqlConnection = new MysqlConnection(DB_HOST, DB_USER, DB_PASS, DB_DATABASE);
const ownerRepository = new InDatabaseOwnerRepository(mysqlConnection);
const documentRepository = new InDatabaseDocumentRepository(mysqlConnection);
const departmentRepository = new InDatabaseDepartmentRepository(mysqlConnection);
const fileStorageService = new CloudinaryFileStorage()
const authService = new AuthJwt();

app.get('/', function (req: any, res: any) {
    res.sendFile(path.join(__dirname, '../public', 'index.html'));
})
app.post('/login', LoginController.validationRules, LoginController.execute);
app.post('/create-owner', [AuthenticateToken], OwnerController.validationRules, OwnerController.execute);
app.post('/create-department', AuthenticateToken, DepartmentController.validationRules, DepartmentController.execute);
app.post('/create-document', AuthenticateToken, DocumentController.validationRules, DocumentController.execute);
const port = process.env.PORT || 3000;
const startup = async () => {
    //await client.connect();
    app.listen(port, () => {
        console.log(`API rodando em http://localhost:${port}`);
    });
}
startup();
export {
    ownerRepository,
    documentRepository,
    departmentRepository,
    fileStorageService,
    mysqlConnection,
    authService
};