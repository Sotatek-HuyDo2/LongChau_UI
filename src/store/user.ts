import { createSlice } from '@reduxjs/toolkit';
import { setAuthorizationToRequest } from 'src/utils/authenticate';
import Storage from 'src/utils/storage';
import jwt_decode from 'jwt-decode';

export type UserState = {
  accessToken: string;
  userProfile: any | null;
};

// interface UserProfile {
//   email: string;
//   firstName: string;
//   lastName: string;
// }

interface IJwtDecode {
  email: string;
  exp: number;
  iat: number;
  role: string;
}

const initialState: UserState = {
  accessToken: Storage.getAccessToken() || '',
  userProfile: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserAuth: (state, action) => {
      const { accessToken } = action.payload;
      state.accessToken = accessToken;

      if (accessToken) {
        setAuthorizationToRequest(accessToken);
        Storage.setAccessToken(accessToken);
        const data: IJwtDecode = jwt_decode(accessToken);
        Storage.setEmail(data.email);
      }
    },

    setUserProfile: (state, action) => {
      state.userProfile = action.payload;
    },

    clearUser: () => {
      setAuthorizationToRequest(null);
      Storage.logout();
      return {
        accessToken: '',
        userProfile: null,
      };
    },
  },
});

export const { setUserAuth, setUserProfile, clearUser } = userSlice.actions;

export default userSlice.reducer;
