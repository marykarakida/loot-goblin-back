import { getAllClassesService } from './getAllClassesService';

import { Class } from '../../types/classes';

interface IClassService {
    getAllClasses(): Promise<Class[]>;
}

const classService = {
    getAllClasses: getAllClassesService,
};

export default classService;
