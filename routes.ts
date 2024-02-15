/**
 * An array of routes that are accessible to the public
 * These routes do not require authentication
 * @type {string[]}
 *  */

export const publicRoutes: string[] = ['/'];

/**
 * An array of routes that are for authentication
 * These routes will redirect logged in users to /settings
 * @type {string[]}
 *  */

export const authRoutes: string[] = ['/auth/login', '/auth/register'];

/**
 * The prefix for api authentication routes
 * Routes that starts with this prefix are used for authentication purposes
 * @type {string}
 *  */
export const apiAuthPrefix: string = '/api/auth';

/**
 * The default redirect path after logging in
 * @type {string}
 *  */
export const DEFAULT_LOGIN_REDIRECT: string = '/settings';
