import { findAllUserCharacters, createCharacter } from './characterRepository';

import { Character, CharacterData } from '../../types/characters';

interface ICharacterRepository {
    findAllUserCharacters(userId: string): Promise<Character[]>;
    createCharacter(characterData: CharacterData): Promise<void>;
}

const characterRepository: ICharacterRepository = {
    findAllUserCharacters,
    createCharacter,
};

export default characterRepository;
