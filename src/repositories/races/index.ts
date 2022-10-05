import { findAllRaces } from './raceRepository';
import { findRaceByName } from './raceRepository';

const raceRepository = {
    findAllRaces,
    findRaceByName,
};

export default raceRepository;
