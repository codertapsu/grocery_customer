import { ChangeEvent, useEffect, useRef } from 'react';
import { FieldErrorsImpl, RegisterOptions, useForm } from 'react-hook-form';

import { GetServerSideProps, NextPage } from 'next';
import Link from 'next/link';

import { Layout } from '@components/layout/layout';
import { randomIntegerNumber } from '@helpers/math.helper';

enum Role {
  Customer = 'Customer',
  Vendor = 'Vendor',
}

interface FormValue {
  email: string;
  password: string;
  confirmPassword: string;
  role: Role;
  code: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
}

type FieldNames = keyof FormValue;

interface Props {
  randomCode: number;
}

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
  return {
    props: {
      randomCode: randomIntegerNumber(4),
    },
  };
};

const Register: NextPage<Props> = ({ randomCode }) => {
  const extraInfoElementRef = useRef<HTMLDivElement>();
  const { register, handleSubmit, formState, control, watch, reset, getValues } = useForm<FormValue>({
    mode: 'onBlur',
    defaultValues: {
      role: Role.Customer,
    },
  });

  // const { login } = useAuth();

  const registerOptions: Record<FieldNames, RegisterOptions<FormValue, any>> = {
    email: { required: 'Email is required' },
    password: { required: 'Password is required' },
    confirmPassword: {
      required: 'Please retype the password',
      validate: (value) => {
        if (watch('password') != value) {
          return 'Your passwords do no match';
        }
      },
    },
    code: {
      required: 'Security code is required',
      validate: (value) => {
        if (Number(value) !== randomCode) {
          return 'Security code do no match';
        }
      },
    },
    role: {
      onChange: (event: ChangeEvent) => {
        const value = (event.target as HTMLInputElement).value;
        const collapse = window.bootstrap.Collapse.getInstance(extraInfoElementRef.current);
        if (value === Role.Vendor.valueOf()) {
          collapse.show();
        } else {
          collapse.hide();
        }
      },
    },
    firstName: {
      validate: (value) => {
        if (!value && getValues('role') === Role.Vendor) {
          return 'First name is required';
        }
        return true;
      },
    },
    lastName: {
      validate: (value) => {
        if (!value && getValues('role') === Role.Vendor) {
          return 'Last name is required';
        }
        return true;
      },
    },
    phoneNumber: {
      validate: (value) => {
        if (!value && getValues('role') === Role.Vendor) {
          return 'Phone number is required';
        }
        return true;
      },
    },
  };

  const handleRegistration = (data: FormValue) => {
    console.log(data);
    // login(data.email, data.password)
    //   .then(() => {
    //     onLoginSuccess();
    //     reset();
    //   })
    //   .catch((error) => onLoginFailed(error));
  };
  const handleError = (errors: FieldErrorsImpl<FormValue>) => {
    console.log(errors);
  };

  useEffect(() => {
    if (window?.bootstrap) {
      const collapse = new window.bootstrap.Collapse(extraInfoElementRef.current, {
        toggle: getValues('role') === Role.Vendor,
      });
    }
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
                  <div className='col-lg-6 col-md-8'>
                    <div className='login_wrap widget-taber-content background-white'>
                      <div className='padding_eight_all bg-white'>
                        <div className='heading_s1'>
                          <h1 className='mb-5'>Create an Account</h1>
                          <p className='mb-30'>
                            Already have an account? <Link href='/login'>Login</Link>
                          </p>
                        </div>
                        <form onSubmit={handleSubmit(handleRegistration, handleError)}>
                          {/* <div className='form-group'>
                          <input type='text' name='username' placeholder='Username' {...register('username', registerOptions.username)} />
                        </div> */}
                          <div className='form-group'>
                            <input
                              type='text'
                              autoComplete='email'
                              name='email'
                              placeholder='Email'
                              {...register('email', registerOptions.email)}
                            />
                          </div>
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
                          <div className='payment_option form-group'>
                            <div className='custome-radio'>
                              <label>
                                <input
                                  className='form-check-input'
                                  type='radio'
                                  name='user_role'
                                  value={Role.Customer.valueOf()}
                                  {...register('role', registerOptions.role)}
                                />
                                <span className='form-check-label'>I am a customer</span>
                              </label>
                            </div>
                            <div className='custome-radio'>
                              <label>
                                <input
                                  className='form-check-input'
                                  type='radio'
                                  name='user_role'
                                  value={Role.Vendor.valueOf()}
                                  {...register('role', registerOptions.role)}
                                />
                                <span className='form-check-label'>I am a vendor</span>
                              </label>
                            </div>
                          </div>
                          <div ref={extraInfoElementRef} className='in collapse'>
                            <div className='form-group'>
                              <input
                                type='text'
                                autoComplete='given-name'
                                name='given-name'
                                placeholder='First name'
                                {...register('firstName', registerOptions.firstName)}
                              />
                            </div>
                            <div className='form-group'>
                              <input
                                type='text'
                                autoComplete='family-name'
                                name='family-name'
                                placeholder='Last name'
                                {...register('lastName', registerOptions.lastName)}
                              />
                            </div>
                            <div className='form-group'>
                              <input
                                type='tel'
                                autoComplete='tel'
                                name='tel'
                                placeholder='Phone number'
                                {...register('phoneNumber', registerOptions.phoneNumber)}
                              />
                            </div>
                          </div>
                          <div className='login_footer form-group mb-50'>
                            <p className='font-xs'>
                              Your personal data will be used to support your experience throughout this website, to
                              manage access to your account, and for other purposes described in our{' '}
                              <Link href='/privacy-policy' target='_blank'>
                                privacy policy
                              </Link>
                              .
                            </p>
                            {/* <div className='chek-form'>
                            <div className='custome-checkbox'>
                              <input
                                className='form-check-input'
                                type='checkbox'
                                name='checkbox'
                                id='exampleCheckbox12'
                              />
                              <label className='form-check-label' htmlFor='exampleCheckbox12'>
                                <span>I agree to terms &amp; Policy.</span>
                              </label>
                            </div>
                          </div> */}
                          </div>
                          <div className='form-group mb-30'>
                            <button
                              type='submit'
                              className='btn btn-fill-out btn-block hover-up font-weight-bold'
                              disabled={!formState.isValid}
                            >
                              Submit &amp; Register
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                  <div className='col-lg-6 pr-30 d-none d-lg-block'>
                    <div className='card-login mt-115'>
                      <a href='#' className='social-login facebook-login'>
                        <img src='assets/imgs/theme/icons/logo-facebook.svg' alt='' />
                        <span>Continue with Facebook</span>
                      </a>
                      <a href='#' className='social-login google-login'>
                        <img src='assets/imgs/theme/icons/logo-google.svg' alt='' />
                        <span>Continue with Google</span>
                      </a>
                      <a href='#' className='social-login apple-login'>
                        <img src='assets/imgs/theme/icons/logo-apple.svg' alt='' />
                        <span>Continue with Apple</span>
                      </a>
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

export default Register;
