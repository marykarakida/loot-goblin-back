import { Request, Response } from 'express';

import classService from '../../services/classes';

export async function getAllClassesController(req: Request, res: Response) {
    const allClasses = await classService.getAllClasses();

    res.status(200).send(allClasses);
}
