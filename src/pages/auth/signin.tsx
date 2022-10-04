import { useAuth } from '@contexts/auth';
import { useHttpClient } from '@contexts/http-client';
import { Provider } from 'next-auth/providers';
import { getCsrfToken, getProviders, getSession, signIn, useSession } from 'next-auth/react';
import { AppContext } from 'next/app';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FormEvent, useRef, ChangeEvent, useState } from 'react';
import { useIsomorphicLayoutEffect } from 'usehooks-ts';

export default function SignIn({ providers }: { providers: Provider[] }) {
  const httpClient = useHttpClient();
  const { user, login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { data: session, status } = useSession();
  const router = useRouter();

  const onClickAuth = () => {
    try {
      // const oauthWindow = window.open(
      //   `${API_URL}/api/social-auth/github`,
      //   'Auth',
      //   'width=500,height=500,status=yes,toolbar=no,menubar=no,location=no',
      // );
      if (typeof window !== 'undefined') {
        window.addEventListener('message', async (e) => {
          console.log(e);

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

        // const oauthInterval = window.setInterval(() => {
        //   if (oauthWindow.closed) {
        //     window.clearInterval(oauthInterval);
        //     // options.callback();
        //   }
        // }, 1000);
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
  // return (
  //   <>
  //     <button onClick={() => onClickAuth()}>Sign in with Github</button>
  //     {providers &&
  //       Object.values(providers).map((provider) => (
  //         <div key={provider.name}>
  //           <button onClick={() => signIn(provider.id, { callbackUrl: String(router.query.callbackUrl), redirect: false, })}>
  //             Sign in with {provider.name}
  //           </button>
  //         </div>
  //       ))}
  //   </>
  // );

  const onChangeUsername = (e: ChangeEvent<HTMLInputElement>) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value;
    setPassword(password);
  };
  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // let currentSession = await getSession();
    const response = await login('admin', '123123');
    // await signIn('credentials', { email: 'test', password: '123123', redirect: false });
    // currentSession = await getSession();

    router.replace(router.query.returnUrl ? window.decodeURIComponent(String(router.query.returnUrl)) : '/');
  };

  return (
    <div className='formCenter'>
      <form className='formFields' noValidate onSubmit={handleLogin}>
        <div className='formField'>
          <label className='formFieldLabel' htmlFor='email'>
            E-Mail Address
          </label>
          <input
            type='email'
            id='email'
            className='formFieldInput'
            placeholder='Enter your email'
            name='email'
            value={username}
            onChange={onChangeUsername}
          />
        </div>

        <div className='formField'>
          <label className='formFieldLabel' htmlFor='password'>
            Password
          </label>
          <input
            type='password'
            id='password'
            className='formFieldInput'
            placeholder='Enter your password'
            name='password'
            value={password}
            onChange={onChangePassword}
          />
        </div>

        <div className='formField'>
          <button className='formFieldButton'>Sign In</button>{' '}
          <Link href='/categories' className='formFieldLink'>
            Categories
          </Link>
        </div>

        <div className='socialMediaButtons'>
          <div className='facebookButton'>{/* <FacebookLoginButton onClick={() => alert('Hello')} /> */}</div>

          <div className='instagramButton'>{/* <InstagramLoginButton onClick={() => alert('Hello')} /> */}</div>
        </div>
      </form>
    </div>
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
