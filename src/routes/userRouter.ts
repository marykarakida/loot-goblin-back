import { Router } from 'express';

import { createSessionController, createUserController, finishSessionController, refreshTokenController } from '../controllers/users';
import { validateSchema } from '../middlewares/validateSchemaMiddleware';
import { validateToken } from '../middlewares/validateTokenMiddleware';

const userRouter = Router();

userRouter.post('/', validateSchema('createUserSchema'), createUserController);
userRouter.post('/login', validateSchema('loginSchema'), createSessionController);
userRouter.post('/logout', validateToken, finishSessionController);
userRouter.post('/token/refresh', refreshTokenController);

export default userRouter;
