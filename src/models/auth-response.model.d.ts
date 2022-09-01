import { User } from './user.model';

export interface AuthResponse {
  message: string;
  statusCode: number;
  user: {
    accessToken: string;
    user: User;
    refreshToken?: string;
  };
}
