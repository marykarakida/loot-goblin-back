import { findClassByName } from './classRepository';

import { Class, ClassNameType } from '../../types/classes';

interface IClassRepository {
    findClassByName(name: ClassNameType): Promise<Class | null>;
}

const classRepository: IClassRepository = {
    findClassByName,
};

export default classRepository;
