// import TwitterProvider from 'next-auth/providers/twitter';
import axios from 'axios';
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
      CredentialsProvider({
        id: 'direct_jwt_auth',
        credentials: {},
        async authorize(credentials) {
          console.log({ credentials });

          // const { id, email, token } = credentials;

          return {
            name: 'Khanh',
          };
          // return {
          //   id: id,
          //   email: email,
          //   token: token,
          // };
        },
      }),
      CredentialsProvider({
        id: 'credentials',
        name: 'Login',
        credentials: {
          email: {
            label: 'Email',
            type: 'email',
            placeholder: 'support@hygraph.com',
          },
          password: {
            label: 'Password',
            type: 'password',
            placeholder: 'Password',
          },
        },
        // credentials: {
        //   username: { label: 'Email', type: 'email', placeholder: 'Your email' },
        //   password: { label: 'Password', type: 'password', placeholder: '*********' },
        // },
        async authorize({ email, password }) {
          try {
            // const response = await fetch('', {
            //   method: 'POST',
            //   body: JSON.stringify({
            //     username: credentials.username,
            //     password: credentials.password,
            //   }),
            //   credentials: 'include',
            // });
            const response = await axios.post('/api/login', {
              email,
              password,
            });

            const cookies = response.headers['set-cookie'];

            res.setHeader('Set-Cookie', cookies);

            return response.data;
          } catch (error) {
            console.log(error);

            throw error;
          }
        },
      }),
      // EmailProvider({
      //   server: process.env.EMAIL_SERVER,
      //   from: process.env.EMAIL_FROM,
      // }),
      // AppleProvider({
      //   clientId: process.env.APPLE_ID,
      //   clientSecret: {
      //     appleId: process.env.APPLE_ID,
      //     teamId: process.env.APPLE_TEAM_ID,
      //     privateKey: process.env.APPLE_PRIVATE_KEY,
      //     keyId: process.env.APPLE_KEY_ID,
      //   },
      // }),
      FacebookProvider({
        clientId: process.env.FACEBOOK_ID,
        clientSecret: process.env.FACEBOOK_SECRET,
      }),
      // GithubProvider({
      //   clientId: process.env.GITHUB_ID,
      //   clientSecret: process.env.GITHUB_SECRET,
      /**
       * @see https://docs.github.com/en/developers/apps/building-oauth-apps/scopes-for-oauth-apps
       */
      //  scope: "read:user"
      // }),
      GoogleProvider({
        clientId: process.env.GOOGLE_ID,
        clientSecret: process.env.GOOGLE_SECRET,
      }),
      // TwitterProvider({
      //   clientId: process.env.TWITTER_ID,
      //   clientSecret: process.env.TWITTER_SECRET,
      // }),
      // Auth0Provider({
      //   clientId: process.env.AUTH0_ID,
      //   clientSecret: process.env.AUTH0_SECRET,
      //   issuer: process.env.AUTH0_ISSUER,
      // }),
    ],
    theme: {
      colorScheme: 'auto',
    },
    /**
     * @see https://next-auth.js.org/configuration/callbacks
     */
    callbacks: {
      async signIn({ user, account, profile, email, credentials }) {
        console.log({ user, account, profile, email, credentials });

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
        console.log({ url, baseUrl });

        // Allows relative callback URLs
        if (url.startsWith('/')) {
          return `${baseUrl}${url}`;
        }
        // Allows callback URLs on the same origin
        else if (new URL(url).origin === baseUrl) {
          return url;
        }
        return baseUrl;

        // return url.startsWith(baseUrl)
        //     ? Promise.resolve(url)
        //     : Promise.resolve(baseUrl)
      },
      async session({ session, user, token }) {
        console.log({ session, user, token });

        // Send properties to the client, like an access_token from a provider.
        session.accessToken = token.accessToken;
        return session;
      },
      async jwt({ token, user, account, profile, isNewUser }) {
        // Persist the OAuth access_token to the token right after signin
        if (account) {
          token.accessToken = account.access_token;
        }
        return token;
      },
    },

    // You can define custom pages to override the built-in ones. These will be regular Next.js pages
    // so ensure that they are placed outside of the '/api' folder, e.g. signIn: '/auth/mycustom-signin'
    // The routes shown here are the default URLs that will be used when a custom
    // pages is not specified for that route.
    // https://next-auth.js.org/configuration/pages
    pages: {
      signIn: '/auth/signin', // Displays signin buttons
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
