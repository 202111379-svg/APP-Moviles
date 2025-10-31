import Auth0, { Credentials } from 'react-native-auth0';
import { AUTH0_DOMAIN, AUTH0_CLIENT_ID, AUTH0_AUDIENCE, AUTH0_SCHEME } from './authConfig';

const auth0 = new Auth0({ domain: AUTH0_DOMAIN, clientId: AUTH0_CLIENT_ID });

export type Session = {
  accessToken: string;
  idToken?: string;
  expiresAt?: number;
  user?: Record<string, any>;
};

export async function login(): Promise<Session> {
  const params = {
    scope: 'openid profile email offline_access',
    audience: AUTH0_AUDIENCE,
    redirectUri: `${AUTH0_SCHEME}://callback`,
  };

  const creds: Credentials = await auth0.webAuth.authorize(params);
  const user = await auth0.auth.userInfo({ token: creds.accessToken });

  return {
    accessToken: creds.accessToken,
    idToken: creds.idToken ?? undefined,
    expiresAt: creds.expiresIn ? Date.now() + creds.expiresIn * 1000 : undefined,
    user,
  };
}

export async function logout(): Promise<void> {
  const params = {
    federated: false,
    returnTo: `${AUTH0_SCHEME}://logout`,
  };

  try {
    await auth0.webAuth.clearSession(params);
  } catch {
  }
}
