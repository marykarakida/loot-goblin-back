import prisma from '../../database';

import { EquipmentsOnInventory, EquipmentsOnInventoryData, EquipmentOnInventoryWithCategoryData } from '../../types/equipmentsOnInventory';

export async function findAllEquipmentsOnInventoryByInventoryId(inventoryId: string): Promise<EquipmentsOnInventory[]> {
    const result = await prisma.equipmentsOnInventory.findMany({ where: { inventoryId }, orderBy: { position: 'asc' } });

    return result;
}

export async function findAllEquipmentsOnInventoryWithCategoryByInventoryId(
    inventoryId: string
): Promise<EquipmentOnInventoryWithCategoryData[]> {
    const result = await prisma.equipmentsOnInventory.findMany({
        where: { inventoryId },
        include: { equipment: { include: { category: true } } },
        orderBy: { position: 'asc' },
    });

    return result;
}

export async function findEquipmentOnInventory(inventoryId: string, equipmentId: string): Promise<EquipmentsOnInventory | null> {
    const result = await prisma.equipmentsOnInventory.findUnique({ where: { inventoryId_equipmentId: { inventoryId, equipmentId } } });

    return result;
}

export async function createEquipmentOnInventory(equipmentOnInventoryData: EquipmentsOnInventoryData): Promise<void> {
    await prisma.equipmentsOnInventory.create({ data: equipmentOnInventoryData });
}
