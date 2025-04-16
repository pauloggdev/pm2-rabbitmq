import Document from "../entity/Document";

export default interface DocumentRepository{
    save(document: Document): Promise<void>;
    findById(id: string): Promise<Document | null>;
    list(): Promise<Document[]>;
    clear(): Promise<void>;
}