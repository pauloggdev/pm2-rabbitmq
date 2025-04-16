import Owner from "../../../domain/entity/Owner";

describe('Owner Entity', () => {
    it('should create an owner with valid data', () => {
        const owner = Owner.create('Alice', 'alice@example.com');

        expect(owner.id).toBeDefined();
        expect(owner.name).toBe('Alice');
        expect(owner.email).toBe('alice@example.com');
        expect(owner.createdAt).toBeInstanceOf(Date);
    });

    it('should trim name and lowercase email on create', () => {
        const owner = Owner.create('   Bob   ', '   BOB@EXAMPLE.COM   ');

        expect(owner.name).toBe('Bob');
        expect(owner.email).toBe('bob@example.com');
    });

    it('should throw error if name is empty', () => {
        expect(() => Owner.create('   ', 'test@example.com')).toThrow('Owner name is required.');
    });

    it('should throw error if email is invalid', () => {
        expect(() => Owner.create('Charlie', 'invalid-email')).toThrow('Valid email is required.');
        expect(() => Owner.create('Charlie', '   ')).toThrow('Valid email is required.');
    });

    it('should update name with valid input', () => {
        const owner = Owner.create('David', 'david@example.com');
        owner.updateName('Daniel');
        expect(owner.name).toBe('Daniel');
    });

    it('should throw error when updating name with empty value', () => {
        const owner = Owner.create('Eve', 'eve@example.com');
        expect(() => owner.updateName('   ')).toThrow('Name cannot be empty.');
    });

    it('should update email and normalize it', () => {
        const owner = Owner.create('Frank', 'frank@example.com');
        owner.updateEmail('  NEW@EMAIL.COM ');
        expect(owner.email).toBe('new@email.com');
    });

    it('should throw error when updating email with invalid value', () => {
        const owner = Owner.create('Grace', 'grace@example.com');
        expect(() => owner.updateEmail('')).toThrow('Valid email is required.');
        expect(() => owner.updateEmail('invalid-email')).toThrow('Valid email is required.');
    });
});
