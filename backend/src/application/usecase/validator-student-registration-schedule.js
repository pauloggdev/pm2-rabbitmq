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
class ValidatorStudentRegistrationSchedule {
    constructor(matriculaRepository, studentRepository) {
        this.matriculaRepository = matriculaRepository;
        this.studentRepository = studentRepository;
    }
    execute() {
        return __awaiter(this, arguments, void 0, function* (params = null) {
            const matriculas = yield this.matriculaRepository.getAllEnrollPending();
            for (let matricula of matriculas) {
                matricula.confirm();
                this.matriculaRepository.update(matricula);
            }
        });
    }
}
exports.default = ValidatorStudentRegistrationSchedule;
