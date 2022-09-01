import axios from 'axios';
import Cookies from 'js-cookie';
import { User } from '@models/user.model';
import { AuthService } from './auth.service';
import { AuthResponse } from '@models/auth-response.model';
import { API_URL } from '@http';

export class AuthStore {
  user = {} as User;
  isAuth = false;
  isLoading = false;

  setAuth(bool: boolean) {
    this.isAuth = bool;
  }

  setUser(user: User) {
    this.user = user;
  }

  setLoading(bool: boolean) {
    this.isLoading = bool;
  }

  async login(email: string, password: string) {
    try {
      console.log('что-то началось!');
      const response = await AuthService.login(email, password);
      console.log({ response });
      Cookies.remove('token-access');
      Cookies.set('token-access', response.data.user.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user.user);
    } catch (e) {
      const error = e as Record<any, any>;
      console.log({ error });
      console.log(error.response?.data?.message);
    }
  }

  async registration(email: string, password: string) {
    try {
      const response = await AuthService.registration(email, password);
      console.log(response);
      Cookies.remove('token-access');
      Cookies.set('token-access', response.data.user.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user.user);
    } catch (e) {
      const error = e as Record<any, any>;
      console.log(error.response?.data?.message);
    }
  }

  async loginPhone(phone: string, channel: string) {
    try {
      const response = await AuthService.loginPhoneApi(phone, channel);
      console.log(response.data.status);
    } catch (e) {
      const error = e as Record<any, any>;
      console.log(error.response?.data?.message);
    }
  }

  async loginMail(email: string) {
    try {
      const response = await AuthService.loginMailApi(email);
      console.log(response.data.status);
    } catch (e) {
      const error = e as Record<any, any>;
      console.log(error.response?.data?.message);
    }
  }

  async verifyPhone(phone: string, otpCode: string) {
    try {
      const response = await AuthService.verifyPhoneApi(phone, otpCode);
      console.log({ responseVerifyPhone: response });
      Cookies.remove('token-access');
      Cookies.set('token-access', response.data.user.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user.user);
    } catch (e) {
      const error = e as Record<any, any>;
      console.log(error.response?.data?.message);
    }
  }

  async verifyMail(mail: string, otpCode: string) {
    try {
      const response = await AuthService.verifyMailApi(mail, otpCode);
      console.log({ responseVerifyPhone: response });
      Cookies.remove('token-access');
      Cookies.set('token-access', response.data.user.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user.user);
    } catch (e) {
      const error = e as Record<any, any>;
      console.log(error.response?.data?.message);
    }
  }

  async logout() {
    try {
      // const response = await AuthService.logout();
      await AuthService.logout();
      Cookies.remove('token-access');
      this.setAuth(false);
      this.setUser({} as User);
    } catch (e) {
      const error = e as Record<any, any>;
      console.log(error.response?.data?.message);
    }
  }

  async checkAuth() {
    this.setLoading(true);
    try {
      const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, {
        withCredentials: true,
      });
      console.log(response);
      Cookies.remove('token-access');
      Cookies.set('token-access', response.data.user.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user.user);
    } catch (e) {
      const error = e as Record<any, any>;
      console.log(error.response?.data?.message);
    } finally {
      this.setLoading(false);
    }
  }
}
