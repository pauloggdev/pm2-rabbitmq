const fs = require('fs/promises');

export default class DeleteTempFileAfterUploadUseCase {
    async execute(files: Array<any>) {
        for (const file of files) {
            await fs.unlink(file.path);
        }
    }
}