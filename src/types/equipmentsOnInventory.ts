import { EquipmentsOnInventory } from '@prisma/client';

type EquipmentsOnInventoryData = Omit<EquipmentsOnInventory, 'id'>;

type CreateEquipmentOnInventoryData = Omit<EquipmentsOnInventory, 'id' | 'status' | 'position'>;

export { EquipmentsOnInventory, EquipmentsOnInventoryData, CreateEquipmentOnInventoryData };
