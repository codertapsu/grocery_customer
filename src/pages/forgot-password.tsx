import { useEffect, useState } from 'react';
import { FieldErrorsImpl, RegisterOptions, useForm } from 'react-hook-form';

import { NextPage } from 'next';

import {Layout} from '@components/layout/layout';
import { randomIntFrom } from '@helpers/math.helper';

interface FormValue {
  email: string;
  code: number;
}

const ForgotPassword: NextPage = () => {
  const [randomCode, setRandomCode] = useState<number>();
  const { register, handleSubmit, formState, control, reset } = useForm<FormValue>({
    mode: 'onBlur',
  });

  const registerOptions: Record<keyof FormValue, RegisterOptions> = {
    email: { required: 'Email is required' },
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
    // login(data.email, data.password)
    //   .then(() => {
    //     onLoginSuccess();
    // reset();
    //   })
    //   .catch(error => onLoginFailed(error));
  };
  const handleError = (errors: FieldErrorsImpl<FormValue>) => {
    console.log(errors);
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
              <div className='col-xl-4 col-lg-6 col-md-12 m-auto'>
                <div className='login_wrap widget-taber-content background-white'>
                  <div className='padding_eight_all bg-white'>
                    <div className='heading_s1'>
                      <img className='border-radius-15' src='assets/imgs/page/forgot_password.svg' alt='' />
                      <h2 className='mb-15 mt-15'>Forgot your password?</h2>
                      <p className='mb-30'>
                        Not to worry, we got you! Let’s get you a new password. Please enter your email address or your
                        Username.
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
                                <b key={digit} className={['text-new', 'text-hot', 'text-sale', 'text-best'][index]}>
                                  {digit}
                                </b>
                              ))}
                        </span>
                      </div>
                      <div className='form-group'>
                        <button
                          type='submit'
                          className='btn btn-heading btn-block hover-up'
                          disabled={!formState.isValid}
                        >
                          Reset password
                        </button>
                      </div>
                    </form>
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

export default ForgotPassword;
