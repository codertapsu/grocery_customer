import { FieldErrorsImpl, RegisterOptions, useForm } from 'react-hook-form';

interface FormValue {
  email: string;
  password: string;
}

interface Props {
  onRegisterSuccess: () => void;
}

export const RegisterForm = ({onRegisterSuccess}: Props) => {
  const { register, handleSubmit, formState, control } = useForm<FormValue>({
    mode: 'onBlur',
  });

  const registerOptions: Record<keyof FormValue, RegisterOptions> = {
    email: { required: 'Name is required' },
    password: { required: 'Password is required' },
  };

  const handleRegistration = (data: FormValue) => {
    console.log(data);
  };
  const handleError = (errors: FieldErrorsImpl<FormValue>) => {
    console.log(errors);
  };

  return (
    <form onSubmit={handleSubmit(handleRegistration, handleError)}>
      <div className='form-group'>
        <label htmlFor='register-email'>Your email address *</label>
        <input
          type='email'
          className='form-control'
          id='register-email'
          name='register-email'
          {...register('email', registerOptions.email)}
        />
        <small className='text-danger'>{formState.errors?.email && formState.errors.email.message}</small>
      </div>
      <div className='form-group'>
        <label htmlFor='register-password'>Password *</label>
        <input
          type='password'
          className='form-control'
          id='register-password'
          name='register-password'
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
          <span>SIGN UP</span>
          <i className='icon-long-arrow-right' />
        </button>
        {/* <div className='custom-control custom-checkbox'>
          <input type='checkbox' className='custom-control-input' id='register-policy' required />
          <label className='custom-control-label' htmlFor='register-policy'>
            I agree to the <a href='#'>privacy policy</a> *
          </label>
        </div> */}
      </div>
    </form>
  );
};
