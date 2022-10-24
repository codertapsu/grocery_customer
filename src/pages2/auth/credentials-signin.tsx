import { CtxOrReq } from 'next-auth/client/_utils';
import { getCsrfToken } from 'next-auth/react';
import { getProviders, getSession, signIn, useSession } from 'next-auth/react';

export default function SignIn({ csrfToken }: { csrfToken: string }) {
  //   You can also use the signIn() function which will handle obtaining the CSRF token for you:
  // signIn("credentials", { username: "jsmith", password: "1234" })
  return (
    <form method='post' action='/api/auth/callback/credentials'>
      <input name='csrfToken' type='hidden' defaultValue={csrfToken} />
      <label>
        Username
        <input name='username' type='text' />
      </label>
      <label>
        Password
        <input name='password' type='password' />
      </label>
      <button type='submit'>Sign in</button>
    </form>
  );
}

export async function getServerSideProps(context: CtxOrReq) {
  const csrfToken = await getCsrfToken(context);
  return {
    props: {
      csrfToken: csrfToken,
    },
  };
}
