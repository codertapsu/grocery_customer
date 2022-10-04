import { LoginForm } from './login-form';
import { RegisterForm } from './register-form';
import { SocialLogin } from './social-login';

interface Props {
  onLoginSuccess: () => void;
  onLoginFailed: (error: unknown) => void;
  onRegisterSuccess: () => void;
}

const AuthForm = ({ onLoginSuccess, onLoginFailed, onRegisterSuccess }: Props) => {
  return (
    <div className='form-box'>
      <div className='form-tab'>
        <ul className='nav nav-pills nav-fill' role='tablist'>
          <li className='nav-item'>
            <a
              className='nav-link active'
              id='signin-tab'
              data-bs-toggle='tab'
              href='#signin'
              role='tab'
              aria-controls='signin'
              aria-selected='true'
            >
              Sign In
            </a>
          </li>
          <li className='nav-item'>
            <a
              className='nav-link'
              id='register-tab'
              data-bs-toggle='tab'
              href='#register'
              role='tab'
              aria-controls='register'
              aria-selected='false'
            >
              Register
            </a>
          </li>
        </ul>
        <div className='tab-content' id='tab-content-5'>
          <div className='tab-pane fade show active' id='signin' role='tabpanel' aria-labelledby='signin-tab'>
            <LoginForm onLoginSuccess={onLoginSuccess} onLoginFailed={onLoginFailed} />
          </div>
          <div className='tab-pane fade' id='register' role='tabpanel' aria-labelledby='register-tab'>
            <RegisterForm onRegisterSuccess={onRegisterSuccess} />
          </div>
        </div>
      </div>
      <div className='form-choice'>
        <p className='mb-1 text-center'>or sign in with</p>
        <SocialLogin onLoginSuccess={onLoginSuccess} onLoginFailed={onLoginFailed} />
      </div>
    </div>
  );
};

export { AuthForm };
