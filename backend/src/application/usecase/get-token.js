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
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
class GetToken {
    constructor(studentRepository) {
        this.studentRepository = studentRepository;
    }
    execute(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const student = yield this.studentRepository.getStudentByEmail(email);
            if (!student)
                throw new Error('Authentication failed');
            const passwordMatch = yield bcrypt.compare(password, student.getPassword());
            if (!passwordMatch)
                throw new Error('Authentication failed');
            const token = jwt.sign({ studentId: student.uuid }, process.env.JWT_SECRET, {
                expiresIn: '1h',
            });
            return token;
        });
    }
}
exports.default = GetToken;
