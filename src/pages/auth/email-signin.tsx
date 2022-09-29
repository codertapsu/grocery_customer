import { getCsrfToken } from 'next-auth/react';

export default function SignIn({ csrfToken }) {
  //   You can also use the signIn() function which will handle obtaining the CSRF token for you:
  // signIn("email", { email: "jsmith@example.com" })
  return (
    <form method='post' action='/api/auth/signin/email'>
      <input name='csrfToken' type='hidden' defaultValue={csrfToken} />
      <label>
        Email address
        <input type='email' id='email' name='email' />
      </label>
      <button type='submit'>Sign in with Email</button>
    </form>
  );
}

export async function getServerSideProps(context) {
  const csrfToken = await getCsrfToken(context);
  return {
    props: { csrfToken },
  };
}
