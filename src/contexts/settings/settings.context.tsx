import { createContext, useMemo, useReducer } from 'react';

import { SettingsActionType } from './models/settings-action-type.model';
import { SettingsState } from './models/settings-state.model';
import { settingsInitialState, settingsReducer } from './settings.reducer';

interface Item {
  name: string;
  value: string;
}

interface Context extends SettingsState {
  changeLanguage: (data: string) => void;
  changeCurrency: (data: string) => void;
  changeTheme: (data: string) => void;
  currencies: Item[];
  languages: Item[];
  languageName: string;
  currencyName: string;
}

/**
 * @see https://learn.microsoft.com/en-us/openspecs/office_standards/ms-oe376/6c085406-a698-4e12-9d4d-c3b0ee3dbc4a
 * @see https://www.countrycodeplanet.com/
 */
const SUPPORTED_LOCALES: Omit<SettingsState, 'theme'>[] = [
  {
    localeId: 'vi',
    countryCode: 'VN',
    currencyCode: 'VND',
  },
  {
    localeId: 'en',
    countryCode: 'US',
    currencyCode: 'USD',
  },
  {
    localeId: 'ru',
    countryCode: 'RU',
    currencyCode: 'RUB',
  },
  {
    localeId: 'ja',
    countryCode: 'JP',
    currencyCode: 'JPY',
  },
  {
    localeId: 'zh',
    countryCode: 'CN',
    currencyCode: 'CNY',
  },
];

export const SettingsContext = createContext<Context>(null);

export const SettingsContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [{ localeId, currencyCode, countryCode, theme }, dispatch] = useReducer(settingsReducer, settingsInitialState);

  const changeLanguage = (data: string) => {
    dispatch({ type: SettingsActionType.SetLanguage, data });
  };

  const changeCurrency = (data: string) => {
    dispatch({ type: SettingsActionType.SetCurrency, data });
  };

  const changeTheme = (data: string) => {
    dispatch({ type: SettingsActionType.SetTheme, data });
  };

  const value: Context = useMemo(() => {
    const languageDetector = new Intl.DisplayNames([localeId], { type: 'language' });
    const countryDetector = new Intl.DisplayNames([localeId], { type: 'region' });
    const currencyDetector = new Intl.DisplayNames([localeId], { type: 'currency' });
    const currencies: Item[] = SUPPORTED_LOCALES.map((item) => ({
      name: currencyDetector.of(item.currencyCode),
      value: item.currencyCode,
    }));
    const languages: Item[] = SUPPORTED_LOCALES.map((item) => ({
      name: languageDetector.of(item.localeId),
      value: item.localeId,
    }));
    const languageName = languageDetector.of(localeId);
    const currencyName = currencyDetector.of(currencyCode);

    return {
      localeId,
      currencyCode,
      countryCode,
      theme,
      languages,
      currencies,
      languageName,
      currencyName,
      changeLanguage,
      changeCurrency,
      changeTheme,
    };
  }, [localeId, currencyCode, countryCode, theme]);

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
};
