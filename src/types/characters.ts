import { Character } from '@prisma/client';

import { RaceNameType } from './races';
import { ClassNameType } from './classes';

type CharacterData = Omit<Character, 'id'>;

interface CreateCharacterData {
    name: string;
    race: RaceNameType;
    class: ClassNameType;
    picture: string | null;
    userId: string;
}

export { Character, CreateCharacterData, CharacterData };
