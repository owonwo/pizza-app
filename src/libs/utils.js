import { AUTH_TOKEN_KEY } from './constants';

export const getToken = () => localStorage.getItem(AUTH_TOKEN_KEY);
export const hasToken = () => !!getToken();
