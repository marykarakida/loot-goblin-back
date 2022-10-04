import prisma from '../../database';

import { Character, CharacterData } from '../../types/characters';

export async function findAllUserCharacters(userId: string): Promise<Character[]> {
    const result = await prisma.character.findMany({ where: { userId } });

    return result;
}

export async function createCharacter(characterData: CharacterData): Promise<void> {
    await prisma.character.create({ data: characterData });
}
