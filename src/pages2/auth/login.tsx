import { NextPage } from 'next';

import { LoginForm } from '@components/auth/login-form';
import { Breadcrumb } from '@components/breadcrumb';
import { Layout } from '@components/layout2';

const Login: NextPage = () => {
  return (
    <Layout>
      <Breadcrumb items={[{ href: '', name: 'Login' }]} />
      <div
        className='login-page bg-image pt-md-12 pb-md-12 pt-lg-17 pb-lg-17 pt-8 pb-8'
        style={{ backgroundImage: 'url("/assets/images/backgrounds/login-bg.jpg")' }}
      >
        <div className='container'>
          <LoginForm
            onLoginSuccess={() => {
              //
            }}
            onLoginFailed={() => {
              //
            }}
          />
        </div>
      </div>
    </Layout>
  );
};

export default Login;
