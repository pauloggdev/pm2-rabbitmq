import { departmentRepository } from "../app";

import { check, validationResult } from "express-validator"
import express, { Request, Response } from "express"
import { CreateDepartmentUseCase } from "../application/usecase/CreateDepartmentUseCase";
export default class DepartmentController {
    static validationRules = [
        check('title').not().isEmpty().withMessage('campo obrigatório'),
        check('files').not().isEmpty().withMessage('campo obrigatório')
    ]
    static async execute(req: Request, res: Response): Promise<void> {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
        }
        const useCase = new CreateDepartmentUseCase(departmentRepository)
        useCase.execute(req.body);
    }
}
