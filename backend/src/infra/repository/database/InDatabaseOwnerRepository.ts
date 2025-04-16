import Owner from "../../../domain/entity/Owner";
import OwnerRepository from "../../../domain/repository/OwnerRepository";
import Connection from "../../db/Connection";

export default class InDatabaseOwnerRepository implements OwnerRepository {

    constructor(readonly connection: Connection) { }

    async findById(ownerId: string): Promise<Owner | null> {
        const [owner] = await this.connection.query("SELECT * FROM owner WHERE uuid = ?", ownerId);
        if (!owner) return null;
        return new Owner(
            ownerId,
            owner.name,
            owner.email,
            owner.password,
            owner.createdAt
        );
    }
    async save(owner: Owner): Promise<void> {
        await this.connection.query('insert into owner (uuid, name, email, password,createdAt) values (?,?,?,?,?)', [
            owner.id,
            owner.name,
            owner.email,
            owner.password,
            owner.createdAt,
        ]);
    }
    async findByEmail(email: string): Promise<Owner | null> {
        const [owner] = await this.connection.query("SELECT * FROM owner WHERE email = ?", email);
        if (!owner) return null;
        return new Owner(
            owner.id,
            owner.name,
            owner.email,
            owner.password,
            owner.createdAt
        );
    }

    async clear(): Promise<void> {
        await this.connection.query('delete from owner', []);
    }
}