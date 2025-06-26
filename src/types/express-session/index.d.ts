import 'express-session';

declare module 'express-session' {
    interface SessionData {
        accessToken?: string;
        idToken?: string;
        refreshToken?: string;
        user?: any;
    }
}
