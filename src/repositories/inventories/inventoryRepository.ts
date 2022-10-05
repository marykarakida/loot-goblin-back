import prisma from '../../database';

import { Inventory, InventoryData, InventoryWithCharacterData } from '../../types/inventories';

export async function findInventoryOwnerById(id: string): Promise<InventoryWithCharacterData | null> {
    const result = await prisma.inventory.findUnique({ where: { id }, include: { character: true } });

    return result;
}

export async function findInventoryByCharacterId(characterId: string): Promise<Inventory | null> {
    const result = await prisma.inventory.findUnique({ where: { characterId } });

    return result;
}

export async function createCharacterInventory(inventoryData: InventoryData): Promise<void> {
    await prisma.inventory.create({ data: inventoryData });
}
