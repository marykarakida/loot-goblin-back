import {
    findAllEquipmentsOnInventoryByInventoryId,
    findAllEquipmentsOnInventoryWithCategoryByInventoryId,
    findEquipmentOnInventory,
    createEquipmentOnInventory,
} from './equipmentsOnInventoryRepository';

const equipmentOnInventoryRepository = {
    findAllEquipmentsOnInventoryByInventoryId,
    findAllEquipmentsOnInventoryWithCategoryByInventoryId,
    findEquipmentOnInventory,
    createEquipmentOnInventory,
};

export default equipmentOnInventoryRepository;
