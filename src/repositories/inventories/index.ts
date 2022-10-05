import { findInventoryOwnerById, findInventoryByCharacterId, createCharacterInventory } from './inventoryRepository';

const inventoryRepository = {
    findInventoryOwnerById,
    findInventoryByCharacterId,
    createCharacterInventory,
};

export default inventoryRepository;
