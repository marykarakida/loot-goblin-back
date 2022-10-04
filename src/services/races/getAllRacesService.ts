import raceRepository from '../../repositories/races';

import { Race } from '@prisma/client';

export async function getAllRacesService(): Promise<Race[]> {
    const allRaces = await raceRepository.findAllRaces();

    return allRaces;
}
