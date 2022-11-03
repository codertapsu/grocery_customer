import 'next-auth/jwt';
import type { DefaultSession } from 'next-auth';

// Read more at: https://next-auth.js.org/getting-started/typescript#module-augmentation

declare module 'next-auth/jwt' {
  interface JWT {
    /** The user's role. */
    userRole?: 'admin';
  }
}

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
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
    };
    // user: {
    //   /** The user's postal address. */
    //   address: string;
    // } & DefaultSession['user'];
  }
}
