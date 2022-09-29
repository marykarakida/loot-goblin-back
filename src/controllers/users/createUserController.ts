import { Request, Response } from 'express';

import userService from '../../services/users';

import { RegisterData } from '../../types/users';

export async function createUserController(req: Request, res: Response) {
    const { passwordConfirmation, ...userDataWithoutPwdConfirmation }: RegisterData = req.body;

    await userService.createUser(userDataWithoutPwdConfirmation);

    res.status(201).send();
}
