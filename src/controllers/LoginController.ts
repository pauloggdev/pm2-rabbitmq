import {ownerRepository, authService } from "../app";

import { check, validationResult } from "express-validator"
import express, { Request, Response } from "express"
import LoginUserUseCase from "../application/usecase/LoginUserUseCase";
export default class LoginController {
    static validationRules = [
        check('email').not().isEmpty().withMessage('campo obrigatório'),
        check('password').not().isEmpty().withMessage('campo obrigatório')
    ]
    static async execute(req: Request, res: Response): Promise<void> {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
        }
        try {
            const useCase = new LoginUserUseCase(ownerRepository, authService);
            const outputLogin = await useCase.execute(req.body);
            res.status(200).json(outputLogin);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }
}