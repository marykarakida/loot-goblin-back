import { Category, Equipment } from '@prisma/client';

interface EquipmentWithCategory extends Equipment {
    category: Category;
}

export { Equipment, EquipmentWithCategory };
