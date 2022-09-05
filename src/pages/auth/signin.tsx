import { API_URL } from '@http';
import { Provider } from 'next-auth/providers';
import { getCsrfToken, getProviders, getSession, signIn, useSession } from 'next-auth/react';
import { AppContext } from 'next/app';
import { useRouter } from 'next/router';
import { useLayoutEffect } from 'react';
import { useIsomorphicLayoutEffect } from 'usehooks-ts';

export default function SignIn({ providers }: { providers: Provider[] }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  const onClickAuth = () => {
    try {
      window.open(
        `${API_URL}/api/social-auth/github`,
        'Auth',
        'width=500,height=500,status=yes,toolbar=no,menubar=no,location=no',
      );
      if (typeof window !== 'undefined') {
        window.addEventListener('message', async (e) => {
          // if (e.origin !== API_URL) {
          //   return;
          // }
          const userData: any = e.data;
          console.log(userData);
          const currentSession = await getSession();
          console.log('currentSession: %o', currentSession);
          // currentSession.user = userData;
          // const updatedSession = await getSession()
          // console.log('updatedSession: %o', updatedSession);

          // if (userData && userData.googleId) {
          //   console.log({ userData });
          //   const data = $api.post('/auth/find_token', {
          //     userId: userData.id,
          //     googleId: userData.googleId,
          //   });

          //   if (data) {
          //     console.log({ data });
          //     Cookies.remove('token-access');
          //     data.then((res) => {
          //       console.log({ res });
          //       setCodeSent(res.data.user.user);
          //       Cookies.set('token-access', res.data.user.accessToken);
          //     });
          //   }
          // } else {
          //   console.log('access token или googleId отсутствуют');
          // }
          return;
        });
      }
    } catch (error) {
      console.log('onClickAuth', error);
    }
  };
  useIsomorphicLayoutEffect(() => {
    // console.log(session);
    // console.log(status);
    // if (status === 'authenticated' && session.user) {
    //   router.push(String(router.query.callbackUrl));
    // }
  }, []);
  return (
    <>
      <button onClick={() => onClickAuth()}>Sign in with Github</button>
      {providers &&
        Object.values(providers).map((provider) => (
          <div key={provider.name}>
            <button onClick={() => signIn(provider.id, { callbackUrl: String(router.query.callbackUrl), redirect: false, })}>
              Sign in with {provider.name}
            </button>
          </div>
        ))}
    </>
  );
}

export async function getServerSideProps(context: any) {
  console.log(context.query);
  const { req } = context;
  const session = await getSession({ req });

  if (session) {
    return {
      redirect: { destination: '/' },
    };
  }

  const providers = await getProviders();
  const csrfToken = await getCsrfToken(context);
  console.log({ providers });

  return {
    props: { providers },
  };
}
