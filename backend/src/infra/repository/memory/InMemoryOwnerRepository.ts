import Owner from "../../../domain/entity/Owner";
import OwnerRepository from "../../../domain/repository/OwnerRepository";

export class InMemoryOwnerRepository implements OwnerRepository {
  private owners: Owner[] = [];

  async findById(ownerId: string): Promise<Owner | null> {
    return this.owners.find(owner => owner.id === ownerId) || null;
  }

  async save(owner: Owner): Promise<void> {
    this.owners.push(owner);
  }
  async clear(): Promise<void> {
    this.owners = [];
 }
}
