import { findInventoryOwnerById, findInventoryByCharacterId, createCharacterInventory } from './inventoryRepository';

import { Inventory, InventoryData, InventoryWithCharacterData } from '../../types/inventories';

interface IInventoryRepository {
    findInventoryOwnerById(id: string): Promise<InventoryWithCharacterData | null>;
    findInventoryByCharacterId(characterId: string): Promise<Inventory | null>;
    createCharacterInventory(inventoryData: InventoryData): Promise<void>;
}

const inventoryRepository: IInventoryRepository = {
    findInventoryOwnerById,
    findInventoryByCharacterId,
    createCharacterInventory,
};

export default inventoryRepository;
