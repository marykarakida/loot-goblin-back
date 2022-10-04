import { Router } from 'express';

import { getAllRacesController } from '../controllers/race';
import { validateToken } from '../middlewares/validateTokenMiddleware';

const raceRouter = Router();

raceRouter.get('/', validateToken, getAllRacesController);

export default raceRouter;
