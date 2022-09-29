import { findUserByEmail, findUserByUsername, createUser } from './userRepository';

import { User, CreateUserData } from '../../types/users';

interface IUserRepository {
    findUserByEmail(email: string): Promise<User | null>;
    findUserByUsername(username: string): Promise<User | null>;
    createUser(userData: CreateUserData): Promise<void>;
}

const userRepository: IUserRepository = {
    findUserByEmail,
    findUserByUsername,
    createUser,
};

export default userRepository;
