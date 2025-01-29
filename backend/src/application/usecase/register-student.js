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
const Student_1 = __importDefault(require("../../domain/entity/Student"));
class RegisterStudent {
    constructor(studentRepository) {
        this.studentRepository = studentRepository;
    }
    execute(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const studentData = yield this.studentRepository.getStudentByEmail(input.email);
            if (studentData)
                throw new Error("student already registered");
            const student = yield Student_1.default.create(input.nome, input.email, input.docBI, input.password);
            this.studentRepository.save(student);
        });
    }
}
exports.default = RegisterStudent;
