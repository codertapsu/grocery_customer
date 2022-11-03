export interface Role {
  created_at: string;
  description: string;
  id: number;
  updated_at: string;
  value: string;
}

export interface User {
  id: number;
  phone: string;
  name: string;
  firstName: string;
  lastName: string;
  email: string;
  isEmailConfirmed: boolean;
  isPhoneConfirmed: boolean;
  isTwoFactorAuthenticationEnabled: boolean;
  avatar?: {
    path: string;
  };
}
