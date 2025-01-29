"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
class Matricula {
    constructor(uuid, aluno_id, code, status) {
        this.uuid = uuid;
        this.aluno_id = aluno_id;
        this.code = code;
        this.status = status;
    }
    static create(aluno_id) {
        const uuid = (0, uuid_1.v4)();
        const status = 'pending';
        const code = `${Math.floor(Math.random() * 1000)}`;
        return new Matricula(uuid, aluno_id, code, status);
    }
    getStatus() {
        return this.status;
    }
    confirm() {
        this.status = 'confirmed';
    }
    getCode() {
        return this.code;
    }
}
exports.default = Matricula;
