import { faker } from '@faker-js/faker';

import userService from '../../../src/services/users';
import userRepository from '../../../src/repositories/users';

describe('Create User Service', () => {
    beforeEach(async () => {
        jest.clearAllMocks();
        jest.resetAllMocks();
    });

    describe('given that register data is valid', () => {
        it('should create a new account', async () => {
            const validUserData = {
                email: faker.internet.email(),
                username: faker.internet.userName(),
                picture: faker.internet.avatar(),
                password: faker.internet.password(),
            };

            jest.spyOn(userRepository, 'findUserByEmail').mockResolvedValueOnce(null);
            jest.spyOn(userRepository, 'findUserByUsername').mockResolvedValueOnce(null);
            jest.spyOn(userRepository, 'createUser').mockResolvedValueOnce();

            await userService.createUser(validUserData);

            expect(userRepository.findUserByEmail).toBeCalledTimes(1);
            expect(userRepository.findUserByUsername).toBeCalledTimes(1);
            expect(userRepository.createUser).toBeCalledTimes(1);

            expect(userRepository.findUserByEmail).toBeCalledWith(validUserData.email);
            expect(userRepository.findUserByUsername).toBeCalledWith(validUserData.username);
        });
    });

    describe('given that email is already linked to an account', () => {
        it('should not create a new account', async () => {
            const validUserData = {
                email: faker.internet.email(),
                username: faker.internet.userName(),
                picture: faker.internet.avatar(),
                password: faker.internet.password(),
            };

            jest.spyOn(userRepository, 'findUserByEmail').mockResolvedValueOnce({ id: faker.datatype.uuid(), ...validUserData });
            jest.spyOn(userRepository, 'findUserByUsername').mockResolvedValueOnce(null);
            jest.spyOn(userRepository, 'createUser').mockResolvedValueOnce();

            await expect(userService.createUser(validUserData)).rejects.toEqual(expect.objectContaining({ type: 'error_conflict' }));

            expect(userRepository.findUserByEmail).toBeCalledTimes(1);
            expect(userRepository.findUserByUsername).toBeCalledTimes(1);
            expect(userRepository.createUser).not.toBeCalled();

            expect(userRepository.findUserByEmail).toBeCalledWith(validUserData.email);
            expect(userRepository.findUserByUsername).toBeCalledWith(validUserData.username);
        });
    });

    describe('given that username is already taken', () => {
        it('should not create a new account', async () => {
            const validUserData = {
                email: faker.internet.email(),
                username: faker.internet.userName(),
                picture: faker.internet.avatar(),
                password: faker.internet.password(),
            };

            jest.spyOn(userRepository, 'findUserByEmail').mockResolvedValueOnce(null);
            jest.spyOn(userRepository, 'findUserByUsername').mockResolvedValueOnce({ id: faker.datatype.uuid(), ...validUserData });
            jest.spyOn(userRepository, 'createUser').mockResolvedValueOnce();

            await expect(userService.createUser(validUserData)).rejects.toEqual(expect.objectContaining({ type: 'error_conflict' }));

            expect(userRepository.findUserByEmail).toBeCalledTimes(1);
            expect(userRepository.findUserByUsername).toBeCalledTimes(1);
            expect(userRepository.createUser).not.toBeCalled();

            expect(userRepository.findUserByEmail).toBeCalledWith(validUserData.email);
            expect(userRepository.findUserByUsername).toBeCalledWith(validUserData.username);
        });
    });
});
