import httpClient from '@http';
import { AuthResponse } from '@models/auth-response.model';
import { AuthVerifyPhoneResponse } from '@models/auth-verify-phone-response.model';
import { AxiosResponse } from 'axios';
// import fingerprint from '../../../utils/fingerprint';

export class AuthService {
  static async login(email: string, password: string) {
    return httpClient.post<AuthResponse>('/auth/login', {
      email,
      password,
      // fingerprint: await fingerprint,
    });

    // const data = fetch('http://localhost:5000/api/auth/login', {
    //   method: 'Post',
    //   credentials: 'include',
    //   mode: 'cors',
    //   headers: {
    //     'Content-Type': 'application/json;charset=UTF-8',
    //   },
    //   body: JSON.stringify({ email, password }),
    // });
    // return data.then(response => response.json());
  }

  static async registration(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
    return httpClient.post<AuthResponse>('/users', { email, password });
  }

  static async loginPhoneApi(phone: string, channel: string): Promise<AxiosResponse<any>> {
    return httpClient.get<any>(`/auth/login/phone?phonenumber=${phone}&channel=${channel}`);
  }

  static async verifyPhoneApi(
    phone: string,
    otpCode: string,
  ): Promise<AxiosResponse<AuthVerifyPhoneResponse>> {
    return httpClient.get<AuthVerifyPhoneResponse>(
      `/auth/verify/phone?phonenumber=${phone}&code=${otpCode}`,
    );
  }

  static async loginMailApi(email: string): Promise<AxiosResponse<any>> {
    return httpClient.post<any>('/auth/login/mail', {
      email,
    });
  }

  static async verifyMailApi(
    mail: string,
    otpCode: string,
  ): Promise<AxiosResponse<AuthVerifyPhoneResponse>> {
    return httpClient.post<AuthVerifyPhoneResponse>('/auth/verify/mail', {
      email: mail,
      code: otpCode,
    });
  }

  static async logout(): Promise<void> {
    return httpClient.post('/auth/logout');
  }
}
