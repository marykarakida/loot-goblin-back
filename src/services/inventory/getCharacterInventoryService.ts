import equipmentOnInventoryRepository from '../../repositories/equipmentsOnInventory';
import inventoryRepository from '../../repositories/inventories';

import { notFoundError } from '../../utlis/errorUtils';

async function ensureInventoryExistsAndBelongToUser(inventoryId: string, userId: string): Promise<void> {
    const validInventory = await inventoryRepository.findInventoryOwnerById(inventoryId);

    if (!validInventory) throw notFoundError('Inventory not found');
    if (validInventory.character.userId !== userId) throw notFoundError('Inventory not found');
}

export async function getCharacterInventoryService(inventoryId: string, userId: string) {
    await ensureInventoryExistsAndBelongToUser(inventoryId, userId);

    const equipmentsOnInventory = await equipmentOnInventoryRepository.findAllEquipmentsOnInventoryWithCategoryByInventoryId(inventoryId);

    return equipmentsOnInventory.reduce(
        (prev, { id, position, quantity, equipment: { categoryName, ...equipmentData } }) => ({
            ...prev,
            [position]: { id, quantity, equipment: equipmentData },
        }),
        {}
    );
}
