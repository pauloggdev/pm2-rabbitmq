export default interface FileStorageService {
    upload(filePath: string, publicId?: string): Promise<{ url: string }>;
}