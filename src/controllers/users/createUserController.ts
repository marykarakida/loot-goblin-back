import { Request, Response } from 'express';

import userService from '../../services/users';
import { CreateUserData, UserDetail } from '../../types/users';

export async function createUserController(req: Request, res: Response) {
    const userData: UserDetail = req.body as CreateUserData;

    await userService.createUser(userData);

    res.status(201).send();
}
