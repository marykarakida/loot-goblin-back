import * as repository from './userRepository';

import { User, UserDetail } from '../../types/users';

interface IUserRepository {
    findUserByEmail(email: string): Promise<User | null>;
    findUserByUsername(username: string): Promise<User | null>;
    createUser(userData: UserDetail): Promise<void>;
}

const userRepository: IUserRepository = repository;

export default userRepository;
