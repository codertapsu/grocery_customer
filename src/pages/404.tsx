import { Breadcrumb } from '@components/breadcrumb';
import { Layout } from '@components/layout';
import { NextPage } from 'next';

const NotFound: NextPage = () => {
  return (
    <Layout>
      <Breadcrumb />
      <div
        className='error-content text-center'
        style={{ backgroundImage: 'url(/assets/images/backgrounds/error-bg.jpg)' }}
      >
        <div className='container'>
          <h1 className='error-title'>Error 404</h1>
          <p>We are sorry, the page you&apos;ve requested is not available.</p>
          <a href='index.html' className='btn btn-outline-primary-2 btn-minwidth-lg'>
            <span>BACK TO HOMEPAGE</span>
            <i className='icon-long-arrow-right' />
          </a>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
