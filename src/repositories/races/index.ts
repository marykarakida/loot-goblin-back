import { findRaceByName } from './raceRepository';

import { Race, RaceNameType } from '../../types/races';

interface IRaceRepository {
    findRaceByName(name: RaceNameType): Promise<Race | null>;
}

const raceRepository: IRaceRepository = {
    findRaceByName,
};

export default raceRepository;
