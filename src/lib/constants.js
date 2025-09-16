export const PROTECTED_ROUTES = ['/dashboard', '/profile', '/api/chat'];
export const PUBLIC_ROUTES = ['/login'];
export const MAX_CONTEXT_WINDOW = 40960;
export const MISTRAL_RATE_LIMIT = [
    {
        tier: 'free', limit: 1, timeframe: 10000, // le temps est en ms soit 1000 = 1s
    },
]
