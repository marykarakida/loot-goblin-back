import prisma from '../../database';

export async function createCharacterInventory(characterId: string): Promise<void> {
    await prisma.inventory.create({ data: { characterId } });
}
