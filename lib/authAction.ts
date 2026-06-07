import { API } from './config';

export const AUTH_STORAGE_KEY = 'user';
export const AUTH_CHANGED_EVENT = 'auth-changed';

export type LoginUser = {
  emailOrUsername: string;
  password: string;
};

export type RegisterUser = {
  username: string;
  name: string;
  email: string;
  password: string;
};

export type AuthResponse = {
  error?: string;
  token?: string;
  user?: {
    name?: string;
    username?: string;
    email?: string;
    isAdmin?: boolean;
    [key: string]: unknown;
  };
  name?: string;
  username?: string;
  email?: string;
  isAdmin?: boolean;
  [key: string]: unknown;
};

const postAuth = async <TBody,>(endpoint: string, body: TBody): Promise<AuthResponse> => {
  try {
    const response = await fetch(`${API}${endpoint}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = (await response.json()) as AuthResponse;

    if (!response.ok && !data.error) {
      return { error: `Request failed with status ${response.status}` };
    }

    return data;
  } catch {
    return { error: 'Something went wrong. Please try again.' };
  }
};

export const signin = async (user: LoginUser): Promise<AuthResponse> => {
  return postAuth('/user/login', user);
};

export const signup = async (user: RegisterUser): Promise<AuthResponse> => {
  return postAuth('/user/register', user);
};

export const authenticate = (data: AuthResponse): void => {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(data));
    window.dispatchEvent(new Event(AUTH_CHANGED_EVENT));
  }
};

export const logout = (): void => {
  if (typeof window !== 'undefined') {
    window.localStorage.removeItem(AUTH_STORAGE_KEY);
    window.dispatchEvent(new Event(AUTH_CHANGED_EVENT));
  }
};

export const isAuth = (): AuthResponse | false => {
  if (typeof window === 'undefined') {
    return false;
  }

  const user = window.localStorage.getItem(AUTH_STORAGE_KEY);

  return user ? (JSON.parse(user) as AuthResponse) : false;
};

export const getAuthToken = (): string | null => {
  const user = isAuth();

  return typeof user === 'object' && typeof user.token === 'string' ? user.token : null;
};

export const getAuthDisplayName = (auth: AuthResponse | false): string => {
  if (!auth) {
    return '';
  }

  return auth.name ?? auth.user?.name ?? auth.username ?? auth.user?.username ?? auth.email ?? auth.user?.email ?? '';
};

export const getRecipeSlug = (): { recipeSlug?: string } | false => {
  if (typeof window === 'undefined') {
    return false;
  }

  const currentRecipe = window.localStorage.getItem('current_recipe');

  return currentRecipe ? (JSON.parse(currentRecipe) as { recipeSlug?: string }) : false;
};
