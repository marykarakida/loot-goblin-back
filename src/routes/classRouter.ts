import { Router } from 'express';

import { getAllClassesController } from '../controllers/classes';
import { validateToken } from '../middlewares/validateTokenMiddleware';

const classRouter = Router();

classRouter.get('/', validateToken, getAllClassesController);

export default classRouter;
