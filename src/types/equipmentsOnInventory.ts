import { Equipment, EquipmentsOnInventory } from '@prisma/client';

import { EquipmentWithCategory } from './equipments';

type EquipmentsOnInventoryData = Omit<EquipmentsOnInventory, 'id'>;

type CreateEquipmentOnInventoryData = Omit<EquipmentsOnInventory, 'id' | 'status' | 'position'>;

interface EquipmentOnInventoryWithCategoryData extends EquipmentsOnInventory {
    equipment: EquipmentWithCategory;
}

export { EquipmentsOnInventory, EquipmentsOnInventoryData, CreateEquipmentOnInventoryData, EquipmentOnInventoryWithCategoryData };
