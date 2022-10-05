import { Router } from 'express';

import authRouter from './authRouter';
import characterRouter from './characterRouter';
import classRouter from './classRouter';
import inventoryRouter from './inventoryRouter';
import raceRouter from './raceRouter';

const router = Router();

router.use('/auth', authRouter);

router.use('/characters', characterRouter);
router.use('/races', raceRouter);
router.use('/classes', classRouter);

router.use('/inventories', inventoryRouter);

export default router;
