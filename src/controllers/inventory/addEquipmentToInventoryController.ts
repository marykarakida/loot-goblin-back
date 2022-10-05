import { Request, Response } from 'express';

import inventoryService from '../../services/inventory';

import { CreateEquipmentOnInventoryData } from '../../types/equipmentsOnInventory';

export async function addEquipmentToInventoryController(req: Request, res: Response) {
    const equipmentOnInventoryData: Omit<CreateEquipmentOnInventoryData, 'inventoryId'> = req.body;
    const inventoryId = req.params.id;
    const userId = res.locals.userId;

    await inventoryService.addEquipmentToInventory({ ...equipmentOnInventoryData, inventoryId }, userId);

    res.status(201).send();
}
