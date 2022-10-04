import { getAllRacesService } from './getAllRacesService';

import { Race } from '../../types/races';

interface IRaceService {
    getAllRaces(): Promise<Race[]>;
}

const raceService: IRaceService = {
    getAllRaces: getAllRacesService,
};

export default raceService;
