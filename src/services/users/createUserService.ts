import userRepository from '../../repositories/users';

import { conflictError } from '../../utlis/errorUtils';
import { hashPassword } from '../../utlis/cryptUtils';

import { RegisterData, User, UserDetail } from '../../types/users';

export async function createUserService(userData: RegisterData) {
    const { email, username, password, picture }: UserDetail = userData;

    const alreadyCreatedUserByEmail: User | null = await userRepository.findUserByEmail(email);
    const alreadyCreatedUserByUsername: User | null = await userRepository.findUserByUsername(username);

    if (alreadyCreatedUserByEmail || alreadyCreatedUserByUsername) {
        throw conflictError('Email or username is already linked to an existing account');
    }

    const hashedPassword: string = hashPassword(password);

    await userRepository.createUser({ email, username, password: hashedPassword, picture });
}
