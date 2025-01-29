import { response } from "express";
import StudentRepository from "../../domain/repository/StudentRepository";
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

export default class GetToken {
    constructor(readonly studentRepository: StudentRepository) { }
    async execute(email: string, password: string) {
        const student = await this.studentRepository.getStudentByEmail(email);
        if (!student) throw new Error('Authentication failed');
        const passwordMatch = await bcrypt.compare(password, student.getPassword());
        if (!passwordMatch) throw new Error('Authentication failed');
        const token = jwt.sign({ studentId: student.uuid }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });
        return token;
    }
}