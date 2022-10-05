import prisma from '../../database';

import { Equipment } from '../../types/equipments';

export async function findAllEquipments(): Promise<Equipment[]> {
    const result = await prisma.equipment.findMany();

    return result;
}

export async function findEquipmentById(id: string): Promise<Equipment | null> {
    const result = await prisma.equipment.findUnique({ where: { id } });

    return result;
}
