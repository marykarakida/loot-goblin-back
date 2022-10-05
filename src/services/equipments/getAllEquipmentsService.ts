import equipmentRepository from '../../repositories/equipments';

import { Equipment } from '../../types/equipments';

export async function getAllEquipmentsService(): Promise<Equipment[]> {
    const allEquipments = await equipmentRepository.findAllEquipments();

    return allEquipments;
}
