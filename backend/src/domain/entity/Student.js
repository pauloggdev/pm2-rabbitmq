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
const uuid_1 = require("uuid");
const bcrypt = require('bcrypt');
class Student {
    constructor(uuid, nome, email, docBI, password) {
        this.uuid = uuid;
        this.nome = nome;
        this.email = email;
        this.docBI = docBI;
        this.password = password;
    }
    static create(nome, email, docBI, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const uuid = (0, uuid_1.v4)();
            const passwordBcrypt = yield bcrypt.hash('123', 10);
            return new Student(uuid, nome, email, docBI, passwordBcrypt);
        });
    }
    getPassword() {
        return this.password;
    }
}
exports.default = Student;
