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
class ValidatorStudentRegistration {
    constructor(matriculaRepository, studentRepository) {
        this.matriculaRepository = matriculaRepository;
        this.studentRepository = studentRepository;
    }
    execute(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const student = yield this.studentRepository.get(input.studentId);
            if (!student)
                throw new Error("Not found student");
            const matricula = yield this.matriculaRepository.getByCode(input.codeRegistration);
            if (!matricula)
                throw new Error("Not found code registration");
            matricula.confirm();
            this.matriculaRepository.update(matricula);
        });
    }
}
exports.default = ValidatorStudentRegistration;
