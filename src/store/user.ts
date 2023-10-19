import { createSlice } from '@reduxjs/toolkit';
import { setAuthorizationToRequest } from 'src/utils/authenticate';
import Storage from 'src/utils/storage';
import jwt_decode from 'jwt-decode';

export type UserState = {
  accessToken: string;
};

interface IJwtDecode {
  email: string;
  exp: number;
  iat: number;
  role: string;
}

const initialState: UserState = {
  accessToken: Storage.getAccessToken() || '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserAuth: (state, action) => {
      const { accessToken } = action.payload;
      state.accessToken = accessToken;

      if (accessToken) {
        Storage.setAccessToken(accessToken);
        const data: IJwtDecode = jwt_decode(accessToken);
        Storage.setEmail(data.email);
      }
    },
    clearUser: () => {
      setAuthorizationToRequest(null);
      Storage.logout();
      return {
        accessToken: '',
      };
    },
  },
});

export const { setUserAuth, clearUser } = userSlice.actions;

export default userSlice.reducer;
