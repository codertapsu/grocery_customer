import { createContext, useCallback, useLayoutEffect, useReducer } from 'react';
import { getCsrfToken, getProviders, getSession, signIn, useSession } from 'next-auth/react';

import { User } from '@models/user.model';
import { useHttpClient } from '@contexts/http-client';

export interface AuthState {
  user: User;
  accessToken: string;
  refreshToken: string;
}

interface Context extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: () => Promise<void>;
  forgotPassword: () => Promise<void>;
  verify: () => Promise<void>;
  me: () => Promise<User>;
}

export enum AuthActionType {
  SetUser = 'SetUser',
  SetAccessToken = 'SetAccessToken',
  SetRefreshToken = 'SetRefreshToken',
  Reset = 'Reset',
}

export type AuthAction =
  | {
      type: AuthActionType.SetUser;
      data: {
        user: User;
        accessToken: string;
        refreshToken: string;
      };
    }
  | {
      type: AuthActionType.SetAccessToken;
      accessToken: string;
    }
  | {
      type: AuthActionType.SetRefreshToken;
      refreshToken: string;
    }
  | {
      type: AuthActionType.Reset;
    };

export const authInitialState: AuthState = {
  user: null,
  accessToken: '',
  refreshToken: '',
};

export const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case AuthActionType.SetUser:
      return {
        ...state,
        user: action.data.user,
        accessToken: action.data.accessToken,
        refreshToken: action.data.refreshToken,
      };
    case AuthActionType.SetAccessToken:
      return {
        ...state,
        accessToken: action.accessToken,
      };
    case AuthActionType.SetRefreshToken:
      return {
        ...state,
        refreshToken: action.refreshToken,
      };
    case AuthActionType.Reset:
      return authInitialState;
    default:
      throw new Error();
  }
};

export const AuthContext = createContext<Context>(null);

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, authInitialState);
  const httpClient = useHttpClient();

  const login = useCallback(async (email: string, password: string) => {
    // const response = await signIn('credentials', { email, password, redirect: false });
  }, []);

  const logout = useCallback(async () => {
    dispatch({ type: AuthActionType.Reset });
  }, []);

  const register = useCallback(async () => {
    //
  }, []);

  const forgotPassword = useCallback(async () => {
    //
  }, []);

  const verify = useCallback(async () => {
    //
  }, []);

  const me = async () => {
    const response = await httpClient.get<User>('/auth/me');

    return response.data;
  };

  useLayoutEffect(() => {
    const initialize = async () => {
      try {
        let response = await httpClient.get<User>('/auth/me');

        if (!response.data && response.status !== 401) {
          response = await httpClient.get<User>('/auth/refresh');
        }

        if (!response.data) {
          throw Error(response.statusText);
        }

        dispatch({
          type: AuthActionType.SetUser,
          data: {
            user: response.data,
            refreshToken: '',
            accessToken: '',
          },
        });
      } catch (error) {}
    };
    initialize();
  }, []);

  const value: Context = {
    login,
    logout,
    register,
    forgotPassword,
    verify,
    me,
    user: state.user,
    accessToken: state.accessToken,
    refreshToken: state.refreshToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
