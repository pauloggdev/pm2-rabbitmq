// src/infra/adapters/CloudinaryFileStorage.ts
import { v2 as cloudinary } from "cloudinary";
import FileStorageService from "../../domain/ports/FileStorageService";

export class CloudinaryFileStorage implements FileStorageService {
    constructor() {
        cloudinary.config({
            cloud_name: 'deqyedure',
            api_key: '193315829634731',
            api_secret: 'lAcOwsidJ4RDPZso3Db6seph4jM', // Substituir por variável de ambiente!
        });
    }

    async upload(filePath: string, publicId?: string): Promise<{ url: string }> {
        try {
            const result = await cloudinary.uploader.upload(filePath, {
                public_id: publicId,
            });
            return { url: result.secure_url };
        } catch (error) {
            console.error('Erro ao fazer upload no Cloudinary:', error);
            throw new Error('Falha no upload do arquivo');
        }
    }
}
