import axios from 'axios';
import Cookies from 'js-cookie';
import { fingerprint } from '@helpers/fingerprint';
import { isProduction } from '@configs';
import { AuthResponse } from '@models/auth-response.model';

export const API_URL = isProduction ? process.env.API_URL : `http://localhost:5000`;

/**
 * @see https://developer.mozilla.org/ru/docs/Web/HTTP/CORS
 */
const $api = axios.create({
  validateStatus: function (status) {
    return status == 200 || status == 201;
  },
  withCredentials: true,
  baseURL: `${API_URL}/api`,
});

$api.interceptors.request.use(async config => {
  config.headers.Authorization = `Bearer ${Cookies.get('token-access')}`;
  config.headers.fingerprint = await fingerprint();

  return config;
});

$api.interceptors.response.use(
  config => {
    return config;
  },
  async error => {
    const originalRequest = error.config;
    if (error.response.status == 401 && error.config && !error.config._isRetry) {
      originalRequest._isRetry = true;
      try {
        const response = await axios.get<AuthResponse>(`${API_URL}/api/auth/refresh`, {
          withCredentials: true,
          headers: {
            fingerprint: await fingerprint(),
          },
        });
        Cookies.remove('token-access');
        Cookies.set('token-access', response.data.user.accessToken);
        return $api.request(originalRequest);
      } catch (e) {
        console.log({ e });
        Cookies.remove('token-access');
      }
    }
    throw error;
  },
);

export default $api;
