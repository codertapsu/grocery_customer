import { useEffect, useState } from 'react';
import { FieldErrorsImpl, RegisterOptions, useForm } from 'react-hook-form';

import { NextPage } from 'next';

import { Layout } from '@components/layout/layout';
import { useRouter } from 'next/router';

interface FormValue {
  password: string;
  confirmPassword: string;
  token: string;
}

const ResetPassword: NextPage = () => {
  const router = useRouter();
  const { register, handleSubmit, formState, control, watch, reset, getValues } = useForm<FormValue>({
    mode: 'onBlur',
    defaultValues: {
      token: String(router.query.token || ''),
    },
  });

  const registerOptions: Record<keyof FormValue, RegisterOptions> = {
    token: {},
    password: { required: 'Password is required' },
    confirmPassword: {
      required: 'Please retype the password',
      validate: (value) => {
        if (watch('password') != value) {
          return 'Your passwords do no match';
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

  return (
    <>
      <Layout parent='Home' sub='Pages' subChild='Login & Register'>
        <div className='page-content pt-150 pb-150'>
          <div className='container'>
            <div className='row'>
              <div className='col-xl-6 col-lg-8 col-md-12 m-auto'>
                <div className='row'>
                  <div className='heading_s1'>
                    <img className='border-radius-15' src='assets/imgs/page/reset_password.svg' alt='' />
                    <h2 className='mb-15 mt-15'>Set new password</h2>
                    <p className='mb-30'>Please create a new password that you don’t use on any other site.</p>
                  </div>
                  <div className='col-lg-6 col-md-8'>
                    <div className='login_wrap widget-taber-content background-white'>
                      <div className='padding_eight_all bg-white'>
                        <form onSubmit={handleSubmit(handleRegistration, handleError)}>
                          <div className='form-group'>
                            <input
                              type='password'
                              autoComplete='new-password'
                              name='password'
                              placeholder='Password'
                              {...register('password', registerOptions.password)}
                            />
                          </div>
                          <div className='form-group'>
                            <input
                              type='password'
                              autoComplete='new-password'
                              name='confirm-password'
                              placeholder='Confirm password'
                              {...register('confirmPassword', registerOptions.confirmPassword)}
                            />
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
                  <div className='col-lg-6 pl-50'>
                    <h6 className='mb-15'>Password should:</h6>
                    <p>Be between 9 and 64 characters</p>
                    <p>Include at least tow of the following:</p>
                    <ol className='list-insider'>
                      <li>An uppercase character</li>
                      <li>A lowercase character</li>
                      <li>A number</li>
                      <li>A special character</li>
                    </ol>
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

export default ResetPassword;
