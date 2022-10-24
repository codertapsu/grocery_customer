import { NextPage } from 'next';
import Image from 'next/image';
import NextImage from 'next/future/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FieldErrorsImpl, RegisterOptions, useForm } from 'react-hook-form';
import { Layout } from '@components/layout/layout';
import { useAuth } from '@contexts/auth';
import { useToast } from '@contexts/toast';
import { PlatformService } from '@contexts/platform';
import { randomIntFrom } from '@helpers/math.helper';

enum SocialId {
  Google = 'google',
  Github = 'github',
  Gitlab = 'gitlab',
  Slack = 'slack',
  Facebook = 'facebook',
  Twitter = 'twitter',
}

interface FormValue {
  email: string;
  password: string;
  code: number;
}

const Login: NextPage = () => {
  const toast = useToast();
  const [randomCode, setRandomCode] = useState<number>();
  const { register, handleSubmit, formState, control, reset } = useForm<FormValue>({
    mode: 'onBlur',
  });
  const { login } = useAuth();

  const registerOptions: Record<keyof FormValue, RegisterOptions> = {
    email: { required: 'Email is required' },
    password: { required: 'Password is required' },
    code: {
      required: 'Security code is required',
      validate: (value) => {
        if (value !== randomCode) {
          return 'Security code do no match';
        }
      },
    },
  };

  const handleRegistration = (data: FormValue) => {
    console.log(data);
    login(data.email, data.password)
      .then(() => {
        reset();
        toast.success(`Welcome`);
      })
      .catch((error) => {
        toast.success(`Incorrect credentials`);
      });
  };
  const handleError = (errors: FieldErrorsImpl<FormValue>) => {
    console.log(errors);
  };

  const handleSocialLogin = (event: MessageEvent) => {
    if (!['http://192.168.1.8:3004', 'http://127.0.0.1:3004', 'http://localhost:3004'].includes(event.origin)) {
      return;
    }
    let userData: any;
    try {
      userData = JSON.parse(event.data);
    } catch (error) {
      userData = event.data;
      console.log({ error });
    }
    console.log(userData);
    // const currentSession = await getSession();
    // console.log('currentSession: %o', currentSession);
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
  };

  const onSocialLogin = (socialId: SocialId) => {
    const platformService = new PlatformService();
    try {
      let oauthWindow: Window;
      if (platformService.SAFARI) {
        /**
         * Safari is blocking any call to window.open() which is made inside an async call.
         * The solution that I found to this problem is to call window.open before making an async call
         * and set the location when the promise resolves.
         */
        oauthWindow = window.open();
        oauthWindow.location = `/api/social-auth/${socialId}`;
      } else {
        oauthWindow = window.open(
          `/api/social-auth/${socialId}`,
          'Auth',
          'width=500,height=500,status=yes,toolbar=no,menubar=no,location=no',
        );
      }
      window.addEventListener('message', handleSocialLogin);
      const oauthInterval = window.setInterval(() => {
        if (oauthWindow.closed) {
          window.removeEventListener('message', handleSocialLogin);
          window.clearInterval(oauthInterval);
        }
      }, 1000);
    } catch (error) {
      console.log('onClickAuth', error);
    }
  };

  useEffect(() => {
    setRandomCode(randomIntFrom(1001, 9999));
    return () => {
      //
    };
  }, []);

  return (
    <>
      <Layout parent='Home' sub='Pages' subChild='Login & Register'>
        <div className='page-content pt-150 pb-150'>
          <div className='container'>
            <div className='row'>
              <div className='col-xl-8 col-lg-10 col-md-12 m-auto'>
                <div className='row'>
                  <div className='col-lg-6 pr-30 d-none d-lg-block'>
                    <NextImage
                      width='0'
                      height='0'
                      sizes='100vw'
                      style={{ width: '100%', height: 'auto' }}
                      className='border-radius-15'
                      src='/assets/imgs/page/login-1.png'
                      alt=''
                    />
                  </div>
                  <div className='col-lg-6 col-md-8'>
                    <div className='login_wrap widget-taber-content background-white'>
                      <div className='padding_eight_all bg-white'>
                        <div className='heading_s1'>
                          <h1 className='mb-5'>Login</h1>
                          <p className='mb-30'>
                            Don&lsquo;t have an account?{' '}
                            <Link href='/register'>
                              <a>Create here</a>
                            </Link>
                          </p>
                        </div>
                        <form onSubmit={handleSubmit(handleRegistration, handleError)}>
                          <div className='form-group'>
                            <input
                              type='email'
                              name='email'
                              autoComplete='email'
                              placeholder='Email'
                              {...register('email', registerOptions.email)}
                            />
                          </div>
                          <div className='form-group'>
                            <input
                              type='password'
                              name='password'
                              autoComplete='current-password'
                              placeholder='Your password'
                              {...register('password', registerOptions.password)}
                            />
                          </div>
                          <div className='login_footer form-group'>
                            <div className='chek-form'>
                              <input
                                type='text'
                                name='one-time-code'
                                autoComplete='one-time-code'
                                placeholder='Security code *'
                                {...register('code', registerOptions.code)}
                              />
                            </div>
                            <span className='security-code'>
                              {randomCode &&
                                String(randomCode)
                                  .split('')
                                  .map((digit, index) => (
                                    <b
                                      key={digit}
                                      className={['text-new', 'text-hot', 'text-sale', 'text-best'][index]}
                                    >
                                      {digit}
                                    </b>
                                  ))}
                            </span>
                          </div>
                          <div className='login_footer form-group mb-50'>
                            <div className='chek-form'>
                              <div className='custome-checkbox'>
                                <label>
                                  <input className='form-check-input' type='checkbox' name='remember_me' />
                                  <span className='form-check-label'>Remember me</span>
                                </label>
                              </div>
                            </div>
                            <Link href='/forgot-password'>
                              <a className='text-muted'>Forgot password?</a>
                            </Link>
                          </div>
                          <div className='form-group'>
                            <button
                              type='submit'
                              className='btn btn-heading btn-block hover-up'
                              disabled={!formState.isValid}
                            >
                              Log in
                            </button>
                          </div>
                        </form>
                        <div className='mt-4'>
                          <button type='button' className='social-login facebook-login border-0'>
                            <NextImage
                              width='0'
                              height='0'
                              sizes='100vw'
                              style={{ width: 'auto', height: '100%' }}
                              src='/assets/imgs/theme/icons/logo-facebook.svg'
                              alt=''
                            />
                            <span className='ms-2'>Continue with Facebook</span>
                          </button>
                          <button type='button' className='social-login google-login'>
                            <Image
                              width={'28px'}
                              height={'28px'}
                              src='/assets/imgs/theme/icons/logo-google.svg'
                              alt=''
                            />
                            <span className='ms-2'>Continue with Google</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Login;
