import { EquipmentsOnInventory } from '@prisma/client';

import { EquipmentWithCategory } from './equipments';

type EquipmentsOnInventoryData = Omit<EquipmentsOnInventory, 'id'>;

type CreateEquipmentOnInventoryData = Omit<EquipmentsOnInventory, 'id' | 'status' | 'position'>;

interface EquipmentOnInventoryWithCategoryData extends EquipmentsOnInventory {
    equipment: EquipmentWithCategory;
}

interface ChangeEquipmentPositionData {
    initialPosition: number;
    finalPosition: number;
    equipmentId: string;
}

export {
    EquipmentsOnInventory,
    EquipmentsOnInventoryData,
    CreateEquipmentOnInventoryData,
    EquipmentOnInventoryWithCategoryData,
    ChangeEquipmentPositionData,
};
