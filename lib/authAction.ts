import { API } from './config';

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
  user?: unknown;
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
    window.localStorage.setItem('user', JSON.stringify(data));
  }
};

export const isAuth = (): AuthResponse | false => {
  if (typeof window === 'undefined') {
    return false;
  }

  const user = window.localStorage.getItem('user');

  return user ? (JSON.parse(user) as AuthResponse) : false;
};

export const getAuthToken = (): string | null => {
  const user = isAuth();

  return typeof user === 'object' && typeof user.token === 'string' ? user.token : null;
};

export const getRecipeSlug = (): { recipeSlug?: string } | false => {
  if (typeof window === 'undefined') {
    return false;
  }

  const currentRecipe = window.localStorage.getItem('current_recipe');

  return currentRecipe ? (JSON.parse(currentRecipe) as { recipeSlug?: string }) : false;
};
