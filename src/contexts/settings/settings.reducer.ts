import { SettingsActionType } from './models/settings-action-type.model';
import { SettingsAction } from './models/settings-action.model';
import { SettingsState } from './models/settings-state.model';

export const settingsInitialState: SettingsState = {
  localeId: 'vi',
  currencyCode: 'VND',
  countryCode: 'VN',
  theme: 'light',
};

export const settingsReducer = (state: SettingsState, action: SettingsAction): SettingsState => {
  switch (action.type) {
    case SettingsActionType.SetLanguage: {
      return {
        ...state,
        localeId: action.data,
      };
    }
    case SettingsActionType.SetCurrency: {
      return {
        ...state,
        currencyCode: action.data,
      };
    }
    case SettingsActionType.SetTheme: {
      return {
        ...state,
        theme: action.data,
      };
    }
    case SettingsActionType.Reset: {
      return settingsInitialState;
    }
    default:
      throw new Error(`Unhandled action type`);
  }
};
