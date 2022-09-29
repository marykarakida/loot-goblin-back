import { Router } from 'express';

import { createSessionController, createUserController, refreshTokenController } from '../controllers/users';
import { validateSchema } from '../middlewares/validateSchemaMiddleware';

const userRouter = Router();

userRouter.post('/', validateSchema('createUserSchema'), createUserController);
userRouter.post('/login', validateSchema('loginSchema'), createSessionController);
userRouter.post('/logout');
userRouter.post('/token/refresh', refreshTokenController);

export default userRouter;
