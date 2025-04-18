const SESSION_TOKEN_KEY = 'auth_token';

export function setSessionToken(token: string) {
  localStorage.setItem(SESSION_TOKEN_KEY, token);
}

export function getSessionToken(): string | null {
  return localStorage.getItem(SESSION_TOKEN_KEY);
}

export function removeSessionToken() {
  localStorage.removeItem(SESSION_TOKEN_KEY);
}

export function getAuthHeaders() {
  return {Authorization: getSessionToken() || ''};
}
