import { Request, Response } from 'express';

import raceService from '../../services/races';

export async function getAllRacesController(req: Request, res: Response) {
    const allRaces = await raceService.getAllRaces();

    res.status(200).send(allRaces);
}
