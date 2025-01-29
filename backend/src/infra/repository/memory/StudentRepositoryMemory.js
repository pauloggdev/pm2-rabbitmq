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
class StudentRepositoryMemory {
    constructor() {
        this.student = [];
    }
    getAll() {
        throw new Error("Method not implemented. 2");
    }
    getStudent(email) {
        throw new Error("Method not implemented.");
    }
    getStudentByEmail(email) {
        throw new Error("Method not implemented.");
    }
    get(uuid) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.student.find(s => s.uuid === uuid) || Promise.reject(new Error("not found student"));
        });
    }
    save(student) {
        return __awaiter(this, void 0, void 0, function* () {
            this.student.push(student);
        });
    }
}
exports.default = StudentRepositoryMemory;
