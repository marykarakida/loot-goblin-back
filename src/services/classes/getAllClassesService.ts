import classRepository from '../../repositories/classes';

import { Class } from '../../types/classes';

export async function getAllClassesService(): Promise<Class[]> {
    const allClasses = await classRepository.findAllClasses();

    return allClasses;
}
