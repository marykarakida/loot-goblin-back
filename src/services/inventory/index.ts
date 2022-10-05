import { addEquipmentToInventoryService } from './addEquipmentToInventoryService';

import { CreateEquipmentOnInventoryData } from '../../types/equipmentsOnInventory';

interface IInventoryService {
    addEquipmentToInventory(equipmentOnInventoryData: CreateEquipmentOnInventoryData, userId: string): Promise<void>;
}

const inventoryService: IInventoryService = {
    addEquipmentToInventory: addEquipmentToInventoryService,
};

export default inventoryService;
