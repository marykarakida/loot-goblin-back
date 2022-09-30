import { faker } from '@faker-js/faker';

import sessionService from '../../../src/services/sessions';
import sessionRepository from '../../../src/repositories/sessions';

describe('Get User Service', () => {
    const mockUserId = faker.datatype.uuid();

    const mockSession = {
        id: faker.datatype.uuid(),
        userId: mockUserId,
        refreshToken: faker.datatype.uuid(),
    };

    beforeEach(async () => {
        jest.clearAllMocks();
        jest.resetAllMocks();
    });

    describe('given that user has one active session', () => {
        it('should return a list with one element', async () => {
            jest.spyOn(sessionRepository, 'findUserSessions').mockResolvedValue([mockSession]);

            await expect(sessionService.getUserSessions(mockUserId)).resolves.toHaveLength(1);

            expect(sessionRepository.findUserSessions).toBeCalledTimes(1);

            expect(sessionRepository.findUserSessions).toBeCalledWith(mockUserId);
        });
    });
});
