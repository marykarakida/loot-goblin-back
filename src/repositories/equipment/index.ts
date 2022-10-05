import { findEquipmentById } from './equipmentRepository';

import { Equipment } from '../../types/equipments';

interface IEquipmentRepository {
    findEquipmentById(id: string): Promise<Equipment | null>;
}

const equipmentRepository = {
    findEquipmentById,
};

export default equipmentRepository;
