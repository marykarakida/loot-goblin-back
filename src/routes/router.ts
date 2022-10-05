import { Router } from 'express';

import authRouter from './authRouter';
import characterRouter from './characterRouter';
import raceRouter from './raceRouter';
import classRouter from './classRouter';

const router = Router();

router.use('/auth', authRouter);
router.use('/characters', characterRouter);
router.use('/races', raceRouter);
router.use('/classes', classRouter);

export default router;
