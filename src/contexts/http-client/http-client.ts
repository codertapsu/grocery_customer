import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import Cookies from 'js-cookie';
import { fingerprint } from '@helpers/fingerprint';
import { isProduction } from '@configs';
import { AuthResponse } from '@models/auth-response.model';

export class HttpClient {
  private readonly _axiosInstance: AxiosInstance;
  private readonly _apiEndpoint: string;

  public constructor(apiEndpoint: string) {
    this._apiEndpoint = apiEndpoint;
    this._axiosInstance = axios.create({
      // validateStatus: function (status) {
      //   return status == 200 || status == 201;
      // },
      withCredentials: true,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      baseURL: `${apiEndpoint}/api`,
    });
    this._axiosInstance.interceptors.request.use(async (config) => {
      // config.headers.Authorization = `Bearer ${Cookies.get('token-access')}`;
      config.headers.fingerprint = await fingerprint();

      return config;
    });
    this._axiosInstance.interceptors.response.use(
      (config) => {
        return config;
      },
      async (error) => {
        const originalRequest = error.config;
        if (error.response?.status == 401 && error.config && !error.config._isRetry) {
          originalRequest._isRetry = true;
          try {
            const response = await axios.get<AuthResponse>(`${this._apiEndpoint}/api/auth/refresh`, {
              withCredentials: true,
              // headers: {
              //   fingerprint: await fingerprint(),
              // },
            });
            // Cookies.remove('token-access');
            // Cookies.set('token-access', response.data.user.accessToken);
            return this._axiosInstance.request(originalRequest);
          } catch (e) {
            console.log({ e });
            // Cookies.remove('token-access');
          }
        }
        throw error;
      },
    );
  }

  public async get<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    const response = await this._axiosInstance.get<T>(url, config);

    return response;
  }

  public async delete<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    const response = await this._axiosInstance.delete<T>(url, config);

    return response;
  }

  public async post<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    const response = await this._axiosInstance.post(url, data, config);

    return response;
  }

  public async put<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    const response = await this._axiosInstance.put(url, data, config);

    return response;
  }

  public async patch<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    const response = await this._axiosInstance.patch(url, data, config);

    return response;
  }
}

export const HttpClientInstance = new HttpClient(process.env.API_URL);
