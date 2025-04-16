import { documentRepository, ownerRepository, fileStorageService } from "../app";

import { check, validationResult } from "express-validator"
import express, { Request, Response } from "express"
import { CreateDocumentUseCase } from "../application/usecase/CreateDocumentUseCase";
import DeleteTempFileAfterUploadUseCase from "../application/usecase/DeleteTempFileAfterUploadUseCase";

export default class DocumentController {

    static validationRules = [
        check('name').not().isEmpty().withMessage('campo obrigatório'),
        check('email').not().isEmpty().withMessage('campo obrigatório'),
        check('file')
            .custom((value: any, { req }: { req: any }) => {
                if (!req.files) {
                    throw new Error('campo obrigatório');
                }
                return true;
            })
    ]

    static async execute(req: Request, res: Response): Promise<void> {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
        }
        const useCase = new CreateDocumentUseCase(documentRepository, ownerRepository, fileStorageService)
        await useCase.execute(req.body);
        const deleteTempFileUseCase = new DeleteTempFileAfterUploadUseCase();
        await deleteTempFileUseCase.execute(req.body.files);
    }

}