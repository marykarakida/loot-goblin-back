import { Request, Response } from 'express';

import userService from '../../services/users';

import { CreateUserData } from '../../types/users';

export async function createUserController(req: Request, res: Response) {
    const userData: CreateUserData = req.body;

    await userService.createUser(userData);

    res.status(201).send();
}
