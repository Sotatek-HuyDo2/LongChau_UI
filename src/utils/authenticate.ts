import axios from 'axios';
import config from 'src/config';

export const setAuthorizationToRequest = (accessToken: string | null) => {
  if (!accessToken) {
    return delete axios.defaults.headers.common['Authorization'];
  }
  axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
};
