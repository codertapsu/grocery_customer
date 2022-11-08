import thunk from 'redux-thunk';

import { configureStore } from '@reduxjs/toolkit';

import { rootReducer } from './reducer/rootReducer';

export const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk],
  devTools: process.env.NODE_ENV !== 'production',
});
