import equipmentOnInventoryRepository from '../../repositories/equipmentsOnInventory';
import inventoryRepository from '../../repositories/inventories';
import equipmentRepository from '../../repositories/equipments';

import inventoryConfig from '../../configs/inventoryConfig';

import { ChangeEquipmentPositionData } from '../../types/equipmentsOnInventory';

import { conflictError, notFoundError, wrongSchemaError } from '../../utlis/errorUtils';

async function ensureInventoryExistsAndBelongToUser(inventoryId: string, userId: string): Promise<void> {
    const validInventory = await inventoryRepository.findInventoryOwnerById(inventoryId);

    if (!validInventory) throw notFoundError('Inventory not found');
    if (validInventory.character.userId !== userId) throw notFoundError('Inventory not found');
}

async function ensureEquipmentExistsAndCanBeFoundOnInventoryAtSpecifiedPosition(
    inventoryId: string,
    equipmentId: string,
    initialPosition: number
) {
    const validEquipment = await equipmentRepository.findEquipmentById(equipmentId);
    if (!validEquipment) throw notFoundError('Equipment not found');

    const equipmentOnInventory = await equipmentOnInventoryRepository.findEquipmentOnInventory(inventoryId, equipmentId);
    if (!equipmentOnInventory) throw notFoundError('Equipment not found in inventory');
    if (equipmentOnInventory.position !== initialPosition) throw conflictError("Equipment's current position does not match");
}

export async function swapEquipmentPositionService(
    inventoryId: string,
    userId: string,
    swapData: ChangeEquipmentPositionData
): Promise<void> {
    const { initialPosition, finalPosition, equipmentId } = swapData;
    const { LIMIT_INVENTORY_SPACE } = inventoryConfig;

    if (initialPosition > LIMIT_INVENTORY_SPACE || finalPosition > LIMIT_INVENTORY_SPACE) {
        throw wrongSchemaError(`Position must be less than or equal to ${LIMIT_INVENTORY_SPACE}`);
    }

    await ensureInventoryExistsAndBelongToUser(inventoryId, userId);
    await ensureEquipmentExistsAndCanBeFoundOnInventoryAtSpecifiedPosition(inventoryId, equipmentId, initialPosition);

    const equipmentOnInvetoryOnPositionBeignSwappedTo = await equipmentOnInventoryRepository.findEquipmentOnInventoryByPosition(
        inventoryId,
        finalPosition
    );

    if (equipmentOnInvetoryOnPositionBeignSwappedTo) {
        await equipmentOnInventoryRepository.changeEquipmentOnInventoryPosition(
            inventoryId,
            equipmentOnInvetoryOnPositionBeignSwappedTo.equipmentId,
            initialPosition
        );
    }

    await equipmentOnInventoryRepository.changeEquipmentOnInventoryPosition(inventoryId, equipmentId, finalPosition);
}
