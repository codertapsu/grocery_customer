import { ServicesBanner } from '@components/services-banner';
import NextImage from 'next/image';

const Footer = () => {
  return (
    <footer className='footer footer-2'>
      <div className='footer-bottom'>
        <div className='container'>
          <p className='footer-copyright'>Copyright © 2019 Molla Store. All Rights Reserved.</p>
          {/* End .footer-copyright */}
          <ul className='footer-menu'>
            <li>
              <a href='#'>Terms Of Use</a>
            </li>
            <li>
              <a href='#'>Privacy Policy</a>
            </li>
          </ul>
          {/* End .footer-menu */}
          <div className='social-icons social-icons-color'>
            <a href='#' className='social-icon social-facebook' title='Facebook' target='_blank'>
              <i className='icon-facebook-f' />
            </a>
            <a href='#' className='social-icon social-twitter' title='Twitter' target='_blank'>
              <i className='icon-twitter' />
            </a>
            <a href='#' className='social-icon social-instagram' title='Instagram' target='_blank'>
              <i className='icon-instagram' />
            </a>
            <a href='#' className='social-icon social-youtube' title='Youtube' target='_blank'>
              <i className='icon-youtube' />
            </a>
            <a href='#' className='social-icon social-pinterest' title='Pinterest' target='_blank'>
              <i className='icon-pinterest' />
            </a>
          </div>
          {/* End .soial-icons */}
        </div>
        {/* End .container */}
      </div>
      {/* End .footer-bottom */}
    </footer>
  );
};

export { Footer };
