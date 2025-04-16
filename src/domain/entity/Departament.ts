import { DepartmentType } from '../../domain/types/DepartmentType';
import { v4 as uuidv4 } from 'uuid';

export default class Departament {
    constructor(
        public readonly id: string,
        public name: string,
        public type: DepartmentType,
        public parentId?: string, // caso haja hierarquia
    ) {
        this.validateName(name);

    }
    static create(name: string, parentId?: string) {
        const uuid = uuidv4();
        const type = 'department';
        return new Departament(uuid, name, type, parentId);
    }

    rename(newName: string) {
        this.validateName(newName)
        this.name = newName;
    }

    changeType(newType: 'department' | 'team' | 'group') {
        this.type = newType;
    }
    validateName(name: string) {
        if (!name || name.trim().length < 2) {
            throw new Error('Nome inválido para departamento');
        }
    }
}
