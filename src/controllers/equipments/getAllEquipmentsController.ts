import { Request, Response } from 'express';

import equipmentService from '../../services/equipments';

export async function getAllEquipmentsController(req: Request, res: Response) {
    const allEquipments = await equipmentService.getAllEquipments();

    res.status(200).send(allEquipments);
}
