import prisma from '../../database';

import { Race } from '../../types/races';

export async function findAllRaces(): Promise<Race[]> {
    const result = await prisma.race.findMany();

    return result;
}

export async function findRaceByName(name: string): Promise<Race | null> {
    const result = await prisma.race.findUnique({ where: { name } });

    return result;
}
