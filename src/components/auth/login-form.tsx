import { useAuth } from '@contexts/auth';
import { FieldErrorsImpl, RegisterOptions, useForm } from 'react-hook-form';

interface Props {
  onLoginSuccess: () => void;
  onLoginFailed: (error: unknown) => void;
}

interface FormValue {
  username: string;
  password: string;
}

export const LoginForm = ({ onLoginSuccess, onLoginFailed }: Props) => {
  const { register, handleSubmit, formState, control } = useForm<FormValue>({
    mode: 'onBlur',
  });
  const { login } = useAuth();

  const registerOptions: Record<keyof FormValue, RegisterOptions> = {
    username: { required: 'Name is required' },
    password: { required: 'Password is required' },
  };

  const handleRegistration = (data: FormValue) => {
    console.log(data);
    login(data.username, data.password)
      .then(() => {
        onLoginSuccess();
      })
      .catch((error) => onLoginFailed(error));
  };
  const handleError = (errors: FieldErrorsImpl<FormValue>) => {
    console.log(errors);
  };

  return (
    <form onSubmit={handleSubmit(handleRegistration, handleError)}>
      <div className='form-group'>
        <label htmlFor='login-username'>Username or email address *</label>
        <input
          type='text'
          className='form-control'
          id='login-username'
          name='login-username'
          {...register('username', registerOptions.username)}
        />
        <small className='text-danger'>{formState.errors?.username && formState.errors.username.message}</small>
      </div>
      <div className='form-group'>
        <label htmlFor='login-password'>Password *</label>
        <input
          type='password'
          className='form-control'
          id='login-password'
          name='login-password'
          {...register('password', registerOptions.password)}
        />
        <small className='text-danger'>{formState.errors?.password && formState.errors.password.message}</small>
      </div>
      <div className='form-footer'>
        <button
          type='submit'
          className='btn btn-outline-primary-2'
          disabled={formState.isSubmitted && !formState.isValid}
        >
          <span>LOG IN</span>
          <i className='icon-long-arrow-right' />
        </button>
        {/* <div className='custom-control custom-checkbox'>
                  <input type='checkbox' className='custom-control-input' id='signin-remember' />
                  <label className='custom-control-label' htmlFor='signin-remember'>
                    Remember Me
                  </label>
                </div> */}
        {/* <a href='#' className='forgot-link'>
                  Forgot Your Password?
                </a> */}
      </div>
    </form>
  );
};
