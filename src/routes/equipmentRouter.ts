import { Router } from 'express';

import { getAllEquipmentsController } from '../controllers/equipments';
import { validateToken } from '../middlewares/validateTokenMiddleware';

const equipmentRouter = Router();

equipmentRouter.get('/', validateToken, getAllEquipmentsController);

export default equipmentRouter;
