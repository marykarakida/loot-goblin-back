import { findAllRaces } from './raceRepository';
import { findRaceByName } from './raceRepository';

import { Race, RaceNameType } from '../../types/races';

interface IRaceRepository {
    findAllRaces(): Promise<Race[]>;
    findRaceByName(name: RaceNameType): Promise<Race | null>;
}

const raceRepository: IRaceRepository = {
    findAllRaces,
    findRaceByName,
};

export default raceRepository;
