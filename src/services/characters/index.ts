import { createCharacterService } from './createCharacterService';

import { CreateCharacterData } from '../../types/characters';

interface ICharacterService {
    createCharacter(characterData: CreateCharacterData): Promise<void>;
}

const characterService: ICharacterService = {
    createCharacter: createCharacterService,
};

export default characterService;
