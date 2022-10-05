import { createCharacterInventory } from './inventoryRepository';

interface IInventoryRepository {
    createCharacterInventory(characterId: string): Promise<void>;
}

const inventoryRepository: IInventoryRepository = {
    createCharacterInventory,
};

export default inventoryRepository;
