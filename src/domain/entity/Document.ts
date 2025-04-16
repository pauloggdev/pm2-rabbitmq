import { DocumentStatus } from "../types/DocumentStatus";
import { v4 as uuidv4 } from 'uuid';

export default class Document {

    public tags: string[] = [];
    constructor(readonly id: string, public title: string, public filePath: string, public fileSize: number, public mimeType: string, public fileHash: string, public content: string, public ownerId: string, public createdAt: Date, public updatedAt: Date, public version: number, public status: string) {
    }
    static create(title: string, filePath: string, fileSize: number, mimeType: string, fileHash: string, content: string, ownerId: string) {

        const id = uuidv4().toString();
        const status = "draft";
        const date = new Date();
        const version = 1
        return new Document(id, title, filePath, fileSize, mimeType, fileHash, content, ownerId, date, date, version, status);
    }

    // Regras de negócio (comportamentos)
    updateContent(newContent: string) {
        if (this.status === 'approved' || this.status === 'archived') {
            throw new Error('Document cannot be updated after approval or archiving.');
        }
        this.content = newContent;
        this.updatedAt = new Date();
        this.version++;
    }

    rename(newTitle: string) {
        if (!newTitle.trim()) throw new Error('Title cannot be empty.');
        this.title = newTitle.trim();
        this.updatedAt = new Date();
    }

    submitForApproval() {
        if (this.status !== 'draft') {
            throw new Error('Only draft documents can be submitted for approval.');
        }
        this.status = 'pending_approval';
        this.updatedAt = new Date();
    }

    approve() {
        if (this.status !== 'pending_approval') {
            throw new Error('Only documents pending approval can be approved.');
        }
        this.status = 'approved';
        this.updatedAt = new Date();
    }

    reject() {
        if (this.status !== 'pending_approval') {
            throw new Error('Only documents pending approval can be rejected.');
        }
        this.status = 'rejected';
        this.updatedAt = new Date();
    }

    archive() {
        if (this.status !== 'approved') {
            throw new Error('Only approved documents can be archived.');
        }
        this.status = 'archived';
        this.updatedAt = new Date();
    }

    addTag(tag: string) {
        if (!this.tags.includes(tag)) {
            this.tags.push(tag);
            this.updatedAt = new Date();
        }
    }
    removeTag(tag: string) {
        this.tags = this.tags.filter(t => t !== tag);
        this.updatedAt = new Date();
    }
}
