import { Request, Response } from 'express';

import inventoryService from '../../services/inventory';

import { CreateEquipmentOnInventoryData } from '../../types/equipmentsOnInventory';

export async function addEquipmentToInventoryController(req: Request, res: Response) {
    const equipmentOnInventoryData: CreateEquipmentOnInventoryData = req.body;
    const userId = res.locals.userId;

    await inventoryService.addEquipmentToInventory(equipmentOnInventoryData, userId);

    res.status(201).send();
}
