import {
    findAllEquipmentsOnInventoryByInventoryId,
    findEquipmentOnInventory,
    createEquipmentOnInventory,
} from './equipmentsOnInventoryRepository';

import { EquipmentsOnInventory, EquipmentsOnInventoryData } from '../../types/equipmentsOnInventory';

interface IEquipmentOnInventory {
    findAllEquipmentsOnInventoryByInventoryId(equipmentId: string): Promise<EquipmentsOnInventory[]>;
    findEquipmentOnInventory(inventoryId: string, equipmentId: string): Promise<EquipmentsOnInventory | null>;
    createEquipmentOnInventory(equipmentOnInventoryData: EquipmentsOnInventoryData): Promise<void>;
}

const equipmentOnInventoryRepository: IEquipmentOnInventory = {
    findAllEquipmentsOnInventoryByInventoryId,
    findEquipmentOnInventory,
    createEquipmentOnInventory,
};

export default equipmentOnInventoryRepository;
