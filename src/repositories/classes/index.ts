import { findAllClasses, findClassByName } from './classRepository';

import { Class, ClassNameType } from '../../types/classes';

interface IClassRepository {
    findAllClasses(): Promise<Class[]>;
    findClassByName(name: ClassNameType): Promise<Class | null>;
}

const classRepository: IClassRepository = {
    findAllClasses,
    findClassByName,
};

export default classRepository;
