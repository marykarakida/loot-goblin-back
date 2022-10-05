import { Router } from 'express';

import { getAllRacesController } from '../controllers/races';
import { validateToken } from '../middlewares/validateTokenMiddleware';

const raceRouter = Router();

raceRouter.get('/', validateToken, getAllRacesController);

export default raceRouter;
