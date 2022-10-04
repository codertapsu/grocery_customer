import { APP_CONFIG } from '@configs';
import { PlatformService } from '@contexts/platform';
import { isClientSide } from '@helpers/detect-browser';
import { useNotification } from '@hooks/use-notification';

enum SocialId {
  Google = 'google',
  Github = 'github',
  Gitlab = 'gitlab',
  Slack = 'slack',
  Facebook = 'facebook',
  Twitter = 'twitter',
}

interface Props {
  onLoginSuccess: () => void;
  onLoginFailed: (error: unknown) => void;
}

export const SocialLogin = ({ onLoginSuccess, onLoginFailed }: Props) => {
  const platformService = new PlatformService();
  const apiEndpoint = APP_CONFIG.API_ENDPOINT;
  const notificationService = useNotification();
  const handleLogin = (event: MessageEvent) => {
    if (
      !['http://192.168.1.8:3004', 'http://127.0.0.1:3004', 'http://localhost:3004', apiEndpoint].includes(event.origin)
    ) {
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
    notificationService.success(`Welcome ${userData.displayName}`);
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

  const onLoginWith = (socialId: SocialId) => {
    try {
      let oauthWindow: Window;
      if (platformService.SAFARI) {
        /**
         * Safari is blocking any call to window.open() which is made inside an async call.
         * The solution that I found to this problem is to call window.open before making an async call
         * and set the location when the promise resolves.
         */
        oauthWindow = window.open();
        oauthWindow.location = `${apiEndpoint}/api/social-auth/${socialId}`;
      } else {
        oauthWindow = window.open(
          `${apiEndpoint}/api/social-auth/${socialId}`,
          'Auth',
          'width=500,height=500,status=yes,toolbar=no,menubar=no,location=no',
        );
      }
      if (isClientSide()) {
        window.addEventListener('message', handleLogin);
        const oauthInterval = window.setInterval(() => {
          if (oauthWindow.closed) {
            window.removeEventListener('message', handleLogin);
            window.clearInterval(oauthInterval);
          }
        }, 1000);
      }
    } catch (error) {
      console.log('onClickAuth', error);
    }
  };

  return (
    <div className='row gy-3'>
      <div className='col-sm-6'>
        <button type='button' className='btn btn-social-login btn-g w-100' onClick={() => onLoginWith(SocialId.Google)}>
          <i className='icon-google' />
          Login with Google
        </button>
      </div>
      <div className='col-sm-6'>
        <button
          type='button'
          className='btn btn-social-login btn-f w-100'
          onClick={() => onLoginWith(SocialId.Facebook)}
        >
          <i className='icon-facebook-f' />
          Login with Facebook
        </button>
      </div>
      <div className='col-sm-6'>
        <button type='button' className='btn btn-social-login btn-f w-100' onClick={() => onLoginWith(SocialId.Github)}>
          <i className='icon-github' />
          Login with Github
        </button>
      </div>
      <div className='col-sm-6'>
        <button type='button' className='btn btn-social-login btn-f w-100' onClick={() => onLoginWith(SocialId.Gitlab)}>
          <i className='icon-gitlab' />
          Login with Gitlab
        </button>
      </div>
    </div>
  );
};
