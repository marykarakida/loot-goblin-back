import { Router } from 'express';

import authRouter from './authRouter';
import characterRouter from './characterRouter';

const router = Router();

router.use('/auth', authRouter);
router.use('/characters', characterRouter);

export default router;
