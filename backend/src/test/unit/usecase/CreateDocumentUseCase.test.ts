import { CreateDocumentUseCase } from "../../../application/usecase/CreateDocumentUseCase";
import Owner from "../../../domain/entity/Owner";
import { InMemoryDocumentRepository } from "../../../infra/repository/memory/InMemoryDocumentRepository";
import { InMemoryOwnerRepository } from "../../../infra/repository/memory/InMemoryOwnerRepository";
import { CloudinaryFileStorage } from '../../../infra/adapters/CloudinaryFileStorage';
import FileStorageService from "../../../domain/ports/FileStorageService";
import OwnerRepository from "domain/repository/OwnerRepository";
import DocumentRepository from "domain/repository/DocumentRepository";
import InDatabaseOwnerRepository from "../../../infra/repository/database/InDatabaseOwnerRepository";
import MysqlConnection from "../../../infra/db/MysqlConnection";
import InDatabaseDocumentRepository from '../../../infra/repository/database/InDabataseDocumentRepository';
import express, { Request, Response, NextFunction } from 'express';
const app = express();

import path from 'path';
import fs from 'fs';
import os from 'os';
import { promisify } from 'util';
import { pipeline } from 'stream';
const pump = promisify(pipeline);
import request from 'supertest';

const DB_HOST = process.env.DB_HOST || "";
const DB_USER = process.env.DB_USER || "";
const DB_PASS = process.env.DB_PASS || "";
const DB_DATABASE = process.env.DB_DATABASE || "";

const mysqlConnection = new MysqlConnection("localhost", "root", "root", "gest_doc");

class CloudinaryFileStorageMock implements FileStorageService {
    async upload(filePath: string, publicId?: string): Promise<{ url: string }> {
        return {
            url: `https://mocked.cloudinary.com/${publicId || 'default'}`,
        };
    }
}

describe('CreateDocumentUseCase', () => {
    let ownerRepository: OwnerRepository;
    let documentRepository: DocumentRepository;
    let useCase: CreateDocumentUseCase;
    let fileStorageService: FileStorageService;

    beforeEach(() => {
        ownerRepository = new InMemoryOwnerRepository();
        documentRepository = new InMemoryDocumentRepository();
        fileStorageService = new CloudinaryFileStorageMock()
        useCase = new CreateDocumentUseCase(documentRepository, ownerRepository, fileStorageService);
        ownerRepository.clear();
        documentRepository.clear();
    });

    it.skip('should create a document successfully', async () => {
        // Arrange
        const owner = Owner.create("John Doe", "john@example.com");
        await ownerRepository.save(owner);
        const filePath = path.join(__dirname, '../../fixtures', 'test-image.jpeg'); // Arquivo real no projeto
        const response = await request(app)
            .post('/upload')
            .attach('files', filePath);
        const input = {
            title: "Test Document",
            files: response.files,
            content: "Some document content",
            ownerId: owner.id
        };

        // Act
        const output = await useCase.execute(input);

        // Assert
        expect(output).toHaveProperty("documentId");
        const storedDocs = await documentRepository.list();
        expect(storedDocs.length).toBe(1);
        expect(storedDocs[0].title).toBe("Test Document");
    });

    it('should throw an error if owner does not exist', async () => {
        const input = {
            title: "Test Document",
            files: "",
            content: "Some document content",
            ownerId: ""
        };
        await expect(useCase.execute(input)).rejects.toThrow("Owner not found");
    });
});
