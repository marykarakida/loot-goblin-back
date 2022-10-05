import { addEquipmentToInventoryService } from './addEquipmentToInventoryService';
import { getCharacterInventoryService } from './getCharacterInventoryService';

const inventoryService = {
    addEquipmentToInventory: addEquipmentToInventoryService,
    getCharacterInventory: getCharacterInventoryService,
};

export default inventoryService;
