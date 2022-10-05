import { Router } from 'express';

import { addEquipmentToInventoryController, getCharacterInventoryController } from '../controllers/inventory';
import { validateToken } from '../middlewares/validateTokenMiddleware';
import { validateSchema } from '../middlewares/validateSchemaMiddleware';

const inventoryRouter = Router();

inventoryRouter.get('/:id', validateToken, getCharacterInventoryController);

inventoryRouter.post(
    '/:id/equipments',
    validateToken,
    validateSchema('createEquipmentOnInventorySchema'),
    addEquipmentToInventoryController
);

export default inventoryRouter;
