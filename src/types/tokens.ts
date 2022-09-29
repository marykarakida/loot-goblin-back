interface TokenPayloadData {
    id: string;
}

interface SessionData {
    accessToken: string;
    refreshToken: string;
}

interface RefreshSessionData {
    refreshToken: string;
}

interface DecodeTokenReturnData {
    isTokenValid: boolean;
    isTokenExpired: boolean;
    payload: TokenPayloadData | null;
}

export { TokenPayloadData, RefreshSessionData, SessionData, DecodeTokenReturnData };
