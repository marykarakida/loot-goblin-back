import { Router } from 'express';

import { createUserController } from '../controllers/users';
import { validateSchema } from '../middlewares/validateSchemaMiddleware';

const userRouter = Router();

userRouter.post('/', validateSchema('createUserSchema'), createUserController);
userRouter.post('/login');
userRouter.post('/logout');
userRouter.post('/token/refresh');

export default userRouter;
