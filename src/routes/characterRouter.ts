import { Router } from 'express';

import { createCharacterController } from '../controllers/characters';
import { validateToken } from '../middlewares/validateTokenMiddleware';
import { validateSchema } from '../middlewares/validateSchemaMiddleware';

const characterRouter = Router();

characterRouter.post('/', validateToken, validateSchema('createCharacterSchema'), createCharacterController);

export default characterRouter;
