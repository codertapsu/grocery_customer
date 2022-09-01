import { createContext, useContext } from 'react';
import { AuthStore } from './auth.store';

// export const stateTypes = { authStore: new AuthStore() };

// export type State = typeof stateTypes;

// export type State = typeof stateTypes;

// export const Context = createContext<State>({
//   authStore: stateTypes.authStore,
// });

// console.log(stateTypes.authStore);

interface State {
  store: AuthStore;
}

export const authStore = new AuthStore();

export const AuthContext = createContext<State>({
  store: authStore,
});

export const useAuth = () => {
  const context = useContext(AuthContext);

  return context;
};
