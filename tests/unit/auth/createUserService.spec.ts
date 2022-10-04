import { faker } from '@faker-js/faker';

import authService from '../../../src/services/auth';
import userRepository from '../../../src/repositories/users';

import { hashPassword } from '../../../src/utlis/cryptUtils';

describe('Create User Service', () => {
    const mockCreateUserData = {
        email: faker.internet.email(),
        username: faker.internet.userName(),
        picture: faker.internet.avatar(),
        password: faker.internet.password(),
    };

    const mockAlreadyCreatedUser = {
        ...mockCreateUserData,
        id: faker.datatype.uuid(),
        password: hashPassword(mockCreateUserData.password),
    };

    beforeEach(async () => {
        jest.clearAllMocks();
        jest.resetAllMocks();
    });

    describe('given that register data is valid', () => {
        it('should create a new account', async () => {
            jest.spyOn(userRepository, 'findUserByEmail').mockResolvedValueOnce(null);
            jest.spyOn(userRepository, 'findUserByUsername').mockResolvedValueOnce(null);
            jest.spyOn(userRepository, 'createUser');

            await expect(authService.createUser(mockCreateUserData)).resolves.not.toThrow();

            expect(userRepository.findUserByEmail).toBeCalledTimes(1);
            expect(userRepository.findUserByUsername).toBeCalledTimes(1);
            expect(userRepository.createUser).toBeCalledTimes(1);

            expect(userRepository.findUserByEmail).toBeCalledWith(mockCreateUserData.email);
            expect(userRepository.findUserByUsername).toBeCalledWith(mockCreateUserData.username);
        });
    });

    describe('given that email is already linked to an account', () => {
        it('should not create a new account', async () => {
            jest.spyOn(userRepository, 'findUserByEmail').mockResolvedValueOnce(mockAlreadyCreatedUser);
            jest.spyOn(userRepository, 'findUserByUsername').mockResolvedValueOnce(null);
            jest.spyOn(userRepository, 'createUser');

            await expect(authService.createUser(mockCreateUserData)).rejects.toEqual(expect.objectContaining({ type: 'error_conflict' }));

            expect(userRepository.findUserByEmail).toBeCalledTimes(1);
            expect(userRepository.findUserByUsername).toBeCalledTimes(1);
            expect(userRepository.createUser).not.toBeCalled();

            expect(userRepository.findUserByEmail).toBeCalledWith(mockCreateUserData.email);
            expect(userRepository.findUserByUsername).toBeCalledWith(mockCreateUserData.username);
        });
    });

    describe('given that username is already taken', () => {
        it('should not create a new account', async () => {
            jest.spyOn(userRepository, 'findUserByEmail').mockResolvedValueOnce(null);
            jest.spyOn(userRepository, 'findUserByUsername').mockResolvedValueOnce(mockAlreadyCreatedUser);
            jest.spyOn(userRepository, 'createUser');

            await expect(authService.createUser(mockCreateUserData)).rejects.toEqual(expect.objectContaining({ type: 'error_conflict' }));

            expect(userRepository.findUserByEmail).toBeCalledTimes(1);
            expect(userRepository.findUserByUsername).toBeCalledTimes(1);
            expect(userRepository.createUser).not.toBeCalled();

            expect(userRepository.findUserByEmail).toBeCalledWith(mockCreateUserData.email);
            expect(userRepository.findUserByUsername).toBeCalledWith(mockCreateUserData.username);
        });
    });
});
