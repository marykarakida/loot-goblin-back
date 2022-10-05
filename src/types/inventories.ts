import { Inventory } from '@prisma/client';

type InventoryData = Omit<Inventory, 'id'>;

export { Inventory, InventoryData };
