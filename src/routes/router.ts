import { Router } from 'express';

import authRouter from './authRouter';
import characterRouter from './characterRouter';
import classRouter from './classRouter';
import raceRouter from './raceRouter';
import equipmentRouter from './equipmentRouter';
import inventoryRouter from './inventoryRouter';

const router = Router();

router.use('/auth', authRouter);

router.use('/characters', characterRouter);
router.use('/races', raceRouter);
router.use('/classes', classRouter);

router.use('/equipments', equipmentRouter);
router.use('/inventories', inventoryRouter);

export default router;
