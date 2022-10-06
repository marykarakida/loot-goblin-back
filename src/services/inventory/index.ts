import { addEquipmentToInventoryService } from './addEquipmentToInventoryService';
import { getCharacterInventoryService } from './getCharacterInventoryService';
import { swapEquipmentPositionService } from './swapEquipmentPositionService';

const inventoryService = {
    addEquipmentToInventory: addEquipmentToInventoryService,
    getCharacterInventory: getCharacterInventoryService,
    swapEquipmentPosition: swapEquipmentPositionService,
};

export default inventoryService;
