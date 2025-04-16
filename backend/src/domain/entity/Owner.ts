import { v4 as uuidv4 } from 'uuid';

export default class Owner {
  constructor(
    readonly id: string,
    public name: string,
    public email: string,
    public password: string,
    public createdAt: Date,
  ) { }

  static create(name: string, email: string, password:string): Owner {
    const id = uuidv4().toString();
    const createdAt = new Date();
    if (!name.trim()) throw new Error('Owner name is required.');
    if (!email.trim() || !email.includes('@')) throw new Error('Valid email is required.');

    return new Owner(id, name.trim(), email.toLowerCase().trim(), password, createdAt);
  }

  updateName(newName: string) {
    if (!newName.trim()) throw new Error('Name cannot be empty.');
    this.name = newName.trim();
  }
  updatePassword(newPassword: string) {
    if (!newPassword.trim()) throw new Error('Password cannot be empty');
    this.password = newPassword;
  }

  updateEmail(newEmail: string) {
    if (!newEmail.trim() || !newEmail.includes('@')) {
      throw new Error('Valid email is required.');
    }
    this.email = newEmail.toLowerCase().trim();
  }
}
