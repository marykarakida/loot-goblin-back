import { Request, Response } from 'express';

import inventoryService from '../../services/inventory';

import { ChangeEquipmentPositionData } from '../../types/equipmentsOnInventory';

export async function swapEquipmentPositionController(req: Request, res: Response) {
    const { initialPosition, finalPosition }: ChangeEquipmentPositionData = req.body;
    const inventoryId = req.params.inventoryId;
    const userId = res.locals.userId;

    if (initialPosition === finalPosition) {
        return res.status(200).send();
    }

    await inventoryService.swapEquipmentPosition(inventoryId, userId, req.body);

    res.status(200).send();
}
