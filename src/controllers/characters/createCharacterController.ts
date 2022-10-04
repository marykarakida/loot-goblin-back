import { Request, Response } from 'express';

import characterService from '../../services/characters';

import { CreateCharacterData } from '../../types/characters';

export async function createCharacterController(req: Request, res: Response) {
    const characterData: Omit<CreateCharacterData, 'userId'> = req.body;
    const userId = res.locals.userId;

    await characterService.createCharacter({ ...characterData, userId });

    res.status(201).send();
}
