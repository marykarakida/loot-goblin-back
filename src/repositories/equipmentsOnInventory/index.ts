import {
    findAllEquipmentsOnInventoryByInventoryId,
    findAllEquipmentsOnInventoryWithCategoryByInventoryId,
    findEquipmentOnInventory,
    findEquipmentOnInventoryByPosition,
    createEquipmentOnInventory,
    changeEquipmentOnInventoryPosition,
} from './equipmentsOnInventoryRepository';

const equipmentOnInventoryRepository = {
    findAllEquipmentsOnInventoryByInventoryId,
    findAllEquipmentsOnInventoryWithCategoryByInventoryId,
    findEquipmentOnInventory,
    findEquipmentOnInventoryByPosition,
    createEquipmentOnInventory,
    changeEquipmentOnInventoryPosition,
};

export default equipmentOnInventoryRepository;
