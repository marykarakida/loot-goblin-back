import {
    findAllEquipmentsOnInventoryByInventoryId,
    findEquipmentOnInventory,
    createEquipmentOnInventory,
} from './equipmentsOnInventoryRepository';

const equipmentOnInventoryRepository = {
    findAllEquipmentsOnInventoryByInventoryId,
    findEquipmentOnInventory,
    createEquipmentOnInventory,
};

export default equipmentOnInventoryRepository;
