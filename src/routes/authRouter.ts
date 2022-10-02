import { Router } from 'express';

import { createSessionController, createUserController, finishSessionController, refreshTokenController } from '../controllers/auth';
import { validateSchema } from '../middlewares/validateSchemaMiddleware';
import { validateToken } from '../middlewares/validateTokenMiddleware';

const authRouter = Router();

authRouter.post('/', validateSchema('createUserSchema'), createUserController);
authRouter.post('/login', validateSchema('loginSchema'), createSessionController);
authRouter.post('/logout', validateToken, validateSchema('refreshTokenSchema'), finishSessionController);
authRouter.post('/refresh', validateSchema('refreshTokenSchema'), refreshTokenController);

export default authRouter;
