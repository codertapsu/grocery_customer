import { SettingsActionType } from './settings-action-type.model';

export type SettingsAction =
  | {
      type: SettingsActionType.SetLanguage;
      data: string;
    }
  | {
      type: SettingsActionType.SetCurrency;
      data: string;
    }
  | {
      type: SettingsActionType.SetTheme;
      data: string;
    }
  | {
      type: SettingsActionType.Reset;
    };
