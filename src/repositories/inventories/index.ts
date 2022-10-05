import { findCharacterInventory, createCharacterInventory } from './inventoryRepository';

import { Inventory, InventoryData } from '../../types/inventories';

interface IInventoryRepository {
    findCharacterInventory(characterId: string): Promise<Inventory | null>;
    createCharacterInventory(inventoryData: InventoryData): Promise<void>;
}

const inventoryRepository: IInventoryRepository = {
    findCharacterInventory,
    createCharacterInventory,
};

export default inventoryRepository;
