import prisma from '../../database';

import { Inventory, InventoryData } from '../../types/inventories';

export async function findCharacterInventory(characterId: string): Promise<Inventory | null> {
    const result = await prisma.inventory.findUnique({ where: { characterId } });

    return result;
}

export async function createCharacterInventory(inventoryData: InventoryData): Promise<void> {
    await prisma.inventory.create({ data: inventoryData });
}
