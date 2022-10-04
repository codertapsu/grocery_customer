import { AuthActionType } from './auth-action-type.model';

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
