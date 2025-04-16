import Owner from "../entity/Owner";

export default interface OwnerRepository{
    findById(ownerId: string): Promise<Owner | null>;   
    findByEmail(email: string): Promise<Owner | null>;   
    save(owner: Owner): Promise<void>;
    clear(): Promise<void>;

}