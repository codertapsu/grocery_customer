import { createContext, useCallback, useEffect, useReducer, useState } from 'react';

import { BroadcastChannel } from 'broadcast-channel';
import { signIn as nextAuthSignIn, signOut as nextAuthSignOut, useSession } from 'next-auth/react';
import { useIsomorphicLayoutEffect } from 'usehooks-ts';

import { Channel } from '@constants/channels.constant';
import { useHttpClient } from '@contexts/http-client';
import { User } from '@models/user.model';

import { authInitialState, authReducer } from './auth.reducer';
import { AuthActionType } from './models/auth-action-type.model';
import { AuthAction } from './models/auth-action.model';
import { AuthState } from './models/auth-state.model';
import { getFingerprint } from '@helpers/fingerprint';

interface Context extends AuthState {
  isOpenAuthDialog: boolean;
  login: (email: string, password: string) => Promise<void>;
  loginWithSocial: (user: User) => void | PromiseLike<void>;
  loginWithWallet: (address: string) => void | PromiseLike<void>;
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

  const login = useCallback(async (email: string, password: string) => {
    const response = await httpClient.post<User>('/auth/login', { email, password });
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

  const loginWithSocial = (user: User) => {
    updateAuthInfo({
      type: AuthActionType.SetUser,
      data: {
        user,
        refreshToken: '',
        accessToken: '',
      },
    });
  };

  const loginWithWallet = async (address: string) => {
    const fingerprint = await getFingerprint();
    const response = await httpClient.post<User>('/auth/wallet', { address, fingerprint });
  };

  const logout = useCallback(async () => {
    try {
      await httpClient.get('/auth/logout');
    } catch (error) {
      console.log(error);
    }
    await nextAuthSignOut({ redirect: false });
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
      } catch (error) {
        const res = await nextAuthSignOut({ redirect: false });
        console.log(res);
      }
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
    loginWithSocial,
    loginWithWallet,
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
