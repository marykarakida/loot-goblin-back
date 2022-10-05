import equipmentRepository from '../../repositories/equipment';
import equipmentOnInventoryRepository from '../../repositories/equipmentsOnInventory';
import inventoryRepository from '../../repositories/inventories';

import inventoryConfig from '../../configs/inventoryConfig';

import { CreateEquipmentOnInventoryData } from '../../types/equipmentsOnInventory';

import { conflictError, notFoundError } from '../../utlis/errorUtils';

async function ensureInventoryExistsAndBelongToUser(inventoryId: string, userId: string): Promise<void> {
    const validInventory = await inventoryRepository.findInventoryOwnerById(inventoryId);

    if (!validInventory) throw notFoundError('Inventory not found');
    if (validInventory.character.userId !== userId) throw notFoundError('Inventory not found');
}

async function ensureEquipmentExists(equipmentId: string): Promise<void> {
    const validEquipment = await equipmentRepository.findEquipmentById(equipmentId);

    if (!validEquipment) throw notFoundError('Equipment not found');
}

async function ensureEquipmentIsNotOnInventoryAlready(inventoryId: string, equipmentId: string) {
    const equipmentOnInventory = await equipmentOnInventoryRepository.findEquipmentOnInventory(inventoryId, equipmentId);

    if (equipmentOnInventory) throw conflictError('Equipment has already beign added to character1s inventory');
}

async function ensureInventoryHasSpace(inventoryId: string): Promise<number> {
    const equipmentsOnUserInventory = await equipmentOnInventoryRepository.findAllEquipmentsOnInventoryByInventoryId(inventoryId);

    if (equipmentsOnUserInventory.length >= inventoryConfig.LIMIT_INVENTORY_SPACE) {
        throw conflictError("Cannot add more than 50 itens in character's inventory. Please remove one if you wish to add another.");
    }

    // get the lowest position free space on inventory
    for (let i = 0; i < equipmentsOnUserInventory.length; i++) {
        const equipment = equipmentsOnUserInventory[i];

        if (equipment.position !== i) return i;
    }

    return equipmentsOnUserInventory.length;
}

export async function addEquipmentToInventoryService(
    equipmentOnInventoryData: CreateEquipmentOnInventoryData,
    userId: string
): Promise<void> {
    const { inventoryId, equipmentId, quantity } = equipmentOnInventoryData;

    await ensureInventoryExistsAndBelongToUser(inventoryId, userId);
    await ensureEquipmentExists(equipmentId);
    await ensureEquipmentIsNotOnInventoryAlready(inventoryId, equipmentId);
    const position = await ensureInventoryHasSpace(inventoryId);

    await equipmentOnInventoryRepository.createEquipmentOnInventory({ equipmentId, inventoryId, quantity, position, status: 'new' });
}
