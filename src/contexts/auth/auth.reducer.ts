import { AuthActionType } from './models/auth-action-type.model';
import { AuthAction } from './models/auth-action.model';
import { AuthState } from './models/auth-state.model';

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
