import { findUserByEmail, findUserByUsername, createUser } from './userRepository';

import { User, UserDetail } from '../../types/users';

export interface IUserRepository {
    findUserByEmail(email: string): Promise<User | null>;
    findUserByUsername(username: string): Promise<User | null>;
    createUser(userData: UserDetail): Promise<void>;
}

const userRepository: IUserRepository = {
    findUserByEmail,
    findUserByUsername,
    createUser,
};

export default userRepository;
