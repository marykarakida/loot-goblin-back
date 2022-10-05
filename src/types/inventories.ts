import { Character, Inventory } from '@prisma/client';

type InventoryData = Omit<Inventory, 'id'>;

interface InventoryWithCharacterData extends Inventory {
    character: Character;
}

export { Inventory, InventoryData, InventoryWithCharacterData };
