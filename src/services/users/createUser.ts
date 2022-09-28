import userRepository from '../../repositories/users';
import { conflictError } from '../../utlis/errorUtils';
import { hashPassword } from '../../utlis/cryptUtils';
import { UserDetail } from '../../types/users';

export async function createUser(userData: UserDetail) {
    const { email, username, password, picture } = userData;

    const alreadyCreatedUserByEmail = await userRepository.findUserByEmail(email);
    const alreadyCreatedUserByUsername = await userRepository.findUserByUsername(username);

    if (alreadyCreatedUserByEmail || alreadyCreatedUserByUsername) {
        throw conflictError('Email or username is already linked to an existing account');
    }

    const hashedPassword = await hashPassword(password);

    await userRepository.createUser({ email, username, password: hashedPassword, picture });
}
