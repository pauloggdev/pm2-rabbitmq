import Document from "../../../domain/entity/Document";
import DocumentRepository from "../../../domain/repository/DocumentRepository";
import Connection from "../../db/Connection";

export default class InDatabaseDocumentRepository implements DocumentRepository {

    constructor(readonly connection: Connection) { }
    async save(document: Document): Promise<void> {
        await this.connection.query('insert into document (uuid, title, filePath, fileSize, mimeType, fileHash, content, ownerId, createdAt, updatedAt, version, status) values (?,?,?,?,?,?,?,?,?,?,?,?)', [
            document.id,
            document.title,
            document.filePath,
            document.fileSize,
            document.mimeType,
            document.fileHash,
            document.content,
            document.ownerId,
            document.createdAt,
            document.updatedAt,
            document.version,
            document.status
        ]);
    }
    async findById(uuid: string): Promise<Document | null> {
        const [document] = await this.connection.query("SELECT * FROM document WHERE uuid = ?", uuid);
        if(!document) return null;
        return new Document(
            uuid,
            document.title,
            document.filePath,
            document.fileSize,
            document.mimeType,
            document.fileHash,
            document.content,
            document.ownerId,
            document.createdAt,
            document.updatedAt,
            document.version,
            document.status
        );
    }
    async list(): Promise<any[]> {
        return await this.connection.query("SELECT * FROM document", []);
    }
    async clear(): Promise<void> {
        await this.connection.query('delete from document', []);
    }
}