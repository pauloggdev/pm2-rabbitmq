import Document from "../../../domain/entity/Document";
import DocumentRepository from "../../../domain/repository/DocumentRepository";

export class InMemoryDocumentRepository implements DocumentRepository {
    private documents: Document[] = [];

    async save(document: Document): Promise<void> {
        this.documents.push(document);
    }

    async findById(id: string): Promise<Document | null> {
        return this.documents.find(doc => doc.id === id) || null;
    }

    async list(): Promise<Document[]> {
        return this.documents;
    }
    async clear(): Promise<void> {
       this.documents = [];
    }
    
    
}
