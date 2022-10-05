import raceRepository from '../../repositories/races';

import { Race } from '../../types/races';

export async function getAllRacesService(): Promise<Race[]> {
    const allRaces = await raceRepository.findAllRaces();

    return allRaces;
}
