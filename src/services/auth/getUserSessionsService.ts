import sessionRepository from '../../repositories/sessions';

import { Session } from '../../types/sessions';

export async function getUserSessionsService(userId: string): Promise<Session[]> {
    const sessions = await sessionRepository.findUserSessions(userId);

    return sessions;
}
