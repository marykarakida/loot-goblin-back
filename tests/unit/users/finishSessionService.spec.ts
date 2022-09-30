import { faker } from '@faker-js/faker';

import sessionService from '../../../src/services/sessions';
import sessionRepository from '../../../src/repositories/sessions';

describe('Finish Session Service', () => {
    const mockCurrentRefreshToken = faker.datatype.uuid();

    const mockSession = {
        id: faker.datatype.uuid(),
        userId: faker.datatype.uuid(),
        refreshToken: mockCurrentRefreshToken,
    };

    beforeEach(async () => {
        jest.clearAllMocks();
        jest.resetAllMocks();
    });

    describe('given that refresh token has a corresponding session', () => {
        it("should delete user's session from database", async () => {
            jest.spyOn(sessionRepository, 'findSessionByRefreshToken').mockResolvedValue(mockSession);
            jest.spyOn(sessionRepository, 'deleteSession').mockResolvedValue();

            await expect(sessionService.finishSession(mockCurrentRefreshToken)).resolves.not.toThrow();

            expect(sessionRepository.findSessionByRefreshToken).toBeCalledTimes(1);
            expect(sessionRepository.deleteSession).toBeCalledTimes(1);

            expect(sessionRepository.findSessionByRefreshToken).toBeCalledWith(mockCurrentRefreshToken);
            expect(sessionRepository.deleteSession).toBeCalledWith(mockSession.id);
        });
    });

    describe('given that refresh token has no corresponding session', () => {
        it('should return nothing', async () => {
            jest.spyOn(sessionRepository, 'findSessionByRefreshToken').mockResolvedValue(null);
            jest.spyOn(sessionRepository, 'deleteSession');

            await expect(sessionService.finishSession(mockCurrentRefreshToken)).resolves.not.toThrow();

            expect(sessionRepository.findSessionByRefreshToken).toBeCalledTimes(1);
            expect(sessionRepository.deleteSession).not.toBeCalled();

            expect(sessionRepository.findSessionByRefreshToken).toBeCalledWith(mockCurrentRefreshToken);
        });
    });
});
