import { createContext, useCallback, useEffect, useReducer, useState } from 'react';

import { useIsomorphicLayoutEffect } from 'usehooks-ts';
import { BroadcastChannel, BroadcastChannelOptions } from 'broadcast-channel';

import { Channel } from '@constants/channels.constant';
import { useHttpClient } from '@contexts/http-client';
import { useBroadcastChannel } from '@hooks/use-broadcast-channel';
import { User } from '@models/user.model';

import { authInitialState, authReducer } from './auth.reducer';
import { AuthActionType } from './models/auth-action-type.model';
import { AuthState } from './models/auth-state.model';
import { AuthAction } from './models/auth-action.model';
import { signIn as nextAuthSignIn, signOut as nextAuthSignOut, useSession } from 'next-auth/react';

interface Context extends AuthState {
  isOpenAuthDialog: boolean;
  login: (usernameOrEmail: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: () => Promise<void>;
  forgotPassword: () => Promise<void>;
  verify: () => Promise<void>;
  me: () => Promise<User>;
  openAuthDialog: () => void;
  closeAuthDialog: () => void;
}

export const AuthContext = createContext<Context>(null);

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, authInitialState);
  const httpClient = useHttpClient();
  const [authChannel, setAuthChannel] = useState<BroadcastChannel<AuthAction>>(null);
  const [isOpenAuthDialog, setIsOpenAuthDialog] = useState<boolean>(false);
  const {} = useSession();

  const updateAuthInfo = useCallback((payload: AuthAction) => {
    dispatch(payload);
    if (payload.type === AuthActionType.SetUser) {
      nextAuthSignIn('patchUser', { user: JSON.stringify(payload.data.user), redirect: false });
    }
    if (authChannel) {
      authChannel.postMessage(payload);
    }
  }, []);

  const login = useCallback(async (username: string, password: string) => {
    const response = await httpClient.post<User>('/auth/login', { username, password });
    updateAuthInfo({
      type: AuthActionType.SetUser,
      data: {
        user: response.data,
        refreshToken: '',
        accessToken: '',
      },
    });
    console.log(response.data);
    // const response = await signIn('credentials', { email, password, redirect: false });
  }, []);

  const logout = useCallback(async () => {
    try {
      await httpClient.get('/auth/logout');
      await nextAuthSignOut({ redirect: false });
    } catch (error) {
      console.log(error);
    }
    updateAuthInfo({ type: AuthActionType.Reset });
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

  const openAuthDialog = () => {
    setIsOpenAuthDialog(true);
  };

  const closeAuthDialog = () => {
    setIsOpenAuthDialog(false);
  };

  useIsomorphicLayoutEffect(() => {
    const controller = new AbortController();
    const initialize = async () => {
      try {
        let response = await httpClient.get<User>('/auth/me', { signal: controller.signal });

        if (!response.data && response.status !== 401) {
          response = await httpClient.get<User>('/auth/refresh', { signal: controller.signal });
        }

        if (!response.data) {
          throw Error(response.statusText);
        }

        updateAuthInfo({
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

    return () => {
      controller.abort('View is destroyed!');
    };
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const authChannel = new BroadcastChannel<AuthAction>(Channel.Auth);
      setAuthChannel(authChannel);
      authChannel.onmessage = (payload) => {
        dispatch(payload);
      };
    }

    return () => {
      if (authChannel) {
        authChannel.close();
      }
    };
  }, []);

  const value: Context = {
    login,
    logout,
    register,
    forgotPassword,
    verify,
    me,
    closeAuthDialog,
    openAuthDialog,
    isOpenAuthDialog,
    user: state.user,
    accessToken: state.accessToken,
    refreshToken: state.refreshToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
