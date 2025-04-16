import { NodePathResult } from './../../../node_modules/@types/babel__traverse/index.d';
import Document from "../../domain/entity/Document";
import FileStorageService from "../../domain/ports/FileStorageService";
import DocumentRepository from "../../domain/repository/DocumentRepository";
import OwnerRepository from "../../domain/repository/OwnerRepository";
import { CreateDocumentInput } from "../Dto/CreateDocumentInput";
import { CreateDocumentOutput } from "../Dto/CreateDocumentOutput";

export class CreateDocumentUseCase {
    constructor(private readonly documentRepository: DocumentRepository, private readonly ownerRepository: OwnerRepository, private fileStorageService: FileStorageService) { }

    async execute(input: CreateDocumentInput): Promise<CreateDocumentOutput> {
        const owner = await this.ownerRepository.findById(input.ownerId);
        if (!owner) {
            throw new Error('Owner not found');
        }

        
        for (const file of input.files) {
            const filePath = file.path;
            const fileSize = file.size;
            const mimeType = file.mimetype;
            const fileHash = file.filename;
            const response = await this.fileStorageService.upload(filePath, fileHash)
            const document = Document.create(input.title, response.url, fileSize, mimeType, fileHash, input.content, input.ownerId);
            await this.documentRepository.save(document);
        }
        return { documentId: '1' };
    }
}
