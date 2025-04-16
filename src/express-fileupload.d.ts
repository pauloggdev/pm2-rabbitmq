// express-fileupload.d.ts
import fileUpload from 'express-fileupload';

declare global {
    namespace Express {
        interface Request {
            files?: fileUpload.FileArray; // Define que files pode ser undefined ou um FileArray
        }
    }
}
