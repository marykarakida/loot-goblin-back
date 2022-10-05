import characterRepository from '../../repositories/characters';
import classRepository from '../../repositories/classes';
import inventoryRepository from '../../repositories/inventories';
import raceRepository from '../../repositories/races';

import characterConfig from '../../configs/characterConfig';

import { CreateCharacterData } from '../../types/characters';
import { Class, ClassNameType } from '../../types/classes';
import { Race, RaceNameType } from '../../types/races';

import { conflictError, notFoundError } from '../../utlis/errorUtils';

async function ensureRaceExistsByName(raceName: RaceNameType): Promise<Race> {
    const validRace = await raceRepository.findRaceByName(raceName);

    if (!validRace) throw notFoundError('Race not found');

    return validRace;
}

async function ensureClassExistsByName(className: ClassNameType): Promise<Class> {
    const validClass = await classRepository.findClassByName(className);

    if (!validClass) throw notFoundError('Class not found');

    return validClass;
}

async function ensureUserHasNotReachedLimitOfCharactersPerUser(userId: string) {
    const userCharacters = await characterRepository.findAllUserCharacters(userId);

    if (userCharacters.length >= characterConfig.LIMIT_CHARACTERS_PER_USER) {
        throw conflictError(
            `Cannot create more than ${characterConfig.LIMIT_CHARACTERS_PER_USER} characters. Please delete one if you wish to create another.`
        );
    }
}

export async function createCharacterService(characterData: CreateCharacterData): Promise<void> {
    const { name, picture, race: raceName, class: className, userId } = characterData;

    const raceData = await ensureRaceExistsByName(raceName);
    const classData = await ensureClassExistsByName(className);

    await ensureUserHasNotReachedLimitOfCharactersPerUser(userId);

    const character = await characterRepository.createCharacter({ name, picture, raceId: raceData.id, classId: classData.id, userId });
    await inventoryRepository.createCharacterInventory({ characterId: character.id });
}
