// import TwitterProvider from 'next-auth/providers/twitter';
import { NextApiRequest, NextApiResponse } from 'next';
import NextAuth, { NextAuthOptions } from 'next-auth';
// import Auth0Provider from 'next-auth/providers/auth0';
import CredentialsProvider from 'next-auth/providers/credentials';
// import AppleProvider from "next-auth/providers/apple";
// import EmailProvider from 'next-auth/providers/email';
import FacebookProvider from 'next-auth/providers/facebook';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import Providers from 'next-auth/providers';
import { User } from '@models/user.model';

/**
 * For more information on each option (and a full list of options) go to
 * @see https://next-auth.js.org/configuration/options
 */
const nextAuthOptions = (req: NextApiRequest, res: NextApiResponse): NextAuthOptions => {
  return {
    /**
     * @see https://next-auth.js.org/configuration/providers/oauth
     */
    providers: [
      // CredentialsProvider({
      //   id: 'update-user',
      //   credentials: {},
      //   authorize(credentials) {
      //     return { user: JSON.parse(credentials.user) };
      //   },
      // }),
      CredentialsProvider<{ user: any }>({
        id: 'patchUser',
        credentials: {
          user: {},
        },
        authorize: async ({ user }) => {
          // Returning token to set in session
          return {
            token: JSON.parse(user),
          } as any;
        },
      }),
    ],
    theme: {
      colorScheme: 'auto',
    },
    /**
     * @see https://next-auth.js.org/configuration/callbacks
     */
    callbacks: {
      async signIn({ user, account, profile, email, credentials }) {
        const isAllowedToSignIn = true;
        if (isAllowedToSignIn) {
          return true;
        } else {
          // Return false to display a default error message
          return false;
          // Or you can return a URL to redirect to:
          // return '/unauthorized'
        }
      },
      async redirect({ url, baseUrl }) {
        // Allows relative callback URLs
        if (url.startsWith('/')) {
          return `${baseUrl}${url}`;
        }
        // Allows callback URLs on the same origin
        else if (new URL(url).origin === baseUrl) {
          return url;
        }
        return baseUrl;
      },
      jwt: async ({ token, user, account, profile, isNewUser }) => {
        if (user) {
          token.user = (user as any).token;
        }
        return token;
      },
      session: async ({ session, token, user }) => {
        session.user = token.user as any; // Setting token in session
        return session;
      },
    },

    // You can define custom pages to override the built-in ones. These will be regular Next.js pages
    // so ensure that they are placed outside of the '/api' folder, e.g. signIn: '/auth/mycustom-signin'
    // The routes shown here are the default URLs that will be used when a custom
    // pages is not specified for that route.
    // https://next-auth.js.org/configuration/pages
    pages: {
      // signIn: '/auth/signin', // Displays signin buttons
      // signOut: '/auth/signout', // Displays form with sign out button
      // error: '/auth/error', // Error code passed in query string as ?error=
      // verifyRequest: '/auth/verify-request', // Used for check email page
      // newUser: null // If set, new users will be directed here on first sign in
    },

    /**
     * Database optional. MySQL, Maria DB, Postgres and MongoDB are supported.
     * https://next-auth.js.org/configuration/databases
     * Notes:
     * * You must install an appropriate node_module for your database
     * * The Email provider requires a database (OAuth providers do not)
     */
    // database: process.env.DATABASE_URL,

    /**
     * The secret should be set to a reasonably long random string.
     * It is used to sign cookies and to sign and encrypt JSON Web Tokens, unless
     * a separate secret is defined explicitly for encrypting the JWT.
     */
    // secret: process.env.SECRET,

    // session: {},
    // jwt: {},

    // Events are useful for logging
    // https://next-auth.js.org/configuration/events
    events: {},

    // Enable debug messages in the console if you are having problems
    debug: false,
  };
};

const configNextAuth = (req: NextApiRequest, res: NextApiResponse) => {
  return NextAuth(req, res, nextAuthOptions(req, res));
};

export default configNextAuth;
