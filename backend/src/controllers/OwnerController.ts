import { ownerRepository, authService } from "../app";

import { check, validationResult } from "express-validator"
import express, { Request, Response } from "express"
import { CreateOwnerUseCase } from "../application/usecase/CreateOwnerUseCase";
export default class OwnerController {
    static validationRules = [
        check('name').not().isEmpty().withMessage('campo obrigatório'),
        check('email').not().isEmpty().withMessage('campo obrigatório')
    ]
    static async execute(req: Request, res: Response): Promise<void> {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
        }
        try {
            const useCase = new CreateOwnerUseCase(ownerRepository, authService)
            useCase.execute(req.body);
            res.status(200).json({
                message: 'success'
            })
        } catch (error: any) {
            res.status(500).json({ error: error.message });

        }

    }
}