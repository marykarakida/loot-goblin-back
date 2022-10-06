import { Request, Response } from 'express';

import inventoryService from '../../services/inventory';

export async function getCharacterInventoryController(req: Request, res: Response) {
    const inventoryId = req.params.inventoryId;
    const userId = res.locals.userId;

    const equipmentsOnInventory = await inventoryService.getCharacterInventory(inventoryId, userId);

    res.status(200).send(equipmentsOnInventory);
}
