import { combineReducers, configureStore } from '@reduxjs/toolkit';
import thunkMiddleware from 'redux-thunk';
import user from 'src/store/user';
import metadata from 'src/store/metadata';

const rootReducer = combineReducers({
  user,
  metadata,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: [thunkMiddleware],
});

export type RootState = ReturnType<typeof store.getState>;

export default () => {
  return { store };
};
