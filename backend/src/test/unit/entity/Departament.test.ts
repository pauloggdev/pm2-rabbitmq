import Departament from "../../../domain/entity/Departament";

describe('Departament Entity', () => {

    it('deve criar um departamento válido', () => {
        const dept = Departament.create('Financeiro');
        expect(dept.name).toBe('Financeiro');
        expect(dept.type).toBe('department');
        expect(dept.parentId).toBeUndefined();
    });

    it('deve lançar erro se o nome for inválido na criação', () => {
        expect(() => Departament.create('')).toThrow('Nome inválido para departamento');
        expect(() => Departament.create('A')).toThrow('Nome inválido para departamento');
    });

    it('deve permitir renomear com um nome válido', () => {
        const dept = Departament.create('RH');
        dept.rename('Recursos Humanos');
        expect(dept.name).toBe('Recursos Humanos');
    });

    it('deve lançar erro se tentar renomear com nome inválido', () => {
        const dept = Departament.create('TI');
        expect(() => dept.rename('')).toThrow('Nome inválido para departamento');
    });

    it('deve permitir trocar o tipo de departamento', () => {
        const dept = Departament.create('Comercial');
        dept.changeType('team');
        expect(dept.type).toBe('team');
    });

});
