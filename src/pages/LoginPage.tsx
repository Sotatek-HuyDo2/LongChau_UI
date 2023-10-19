import { Box, Flex, Text } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { GuestPage } from 'src/components/layouts';
import '../styles/pages/LoginPage.scss';
import { GoogleIcon } from 'src/assets/icons';
import { GoogleLogin } from 'react-google-login';
import { gapi } from 'gapi-script';
import config from 'src/config';
import { toastError, toastSuccess } from 'src/utils/notify';
import rf from 'src/services/RequestFactory';
import { useDispatch } from 'react-redux';
import { setUserAuth } from '../store/user';
import { useNavigate } from 'react-router-dom';

const clientId = config.auth.googleClientId;

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    function start() {
      gapi.auth2.init({
        clientId,
        scope: 'email',
      });
    }

    gapi.load('client:auth2', start);
  }, []);

  const onSuccess = async (response: any) => {
    try {
      const res = await rf.getRequest('AuthRequest').login({
        ggAccessToken: response.accessToken,
      });

      dispatch(setUserAuth(res.data));
      toastSuccess('Welcome to LongChau!');
      navigate('/');
    } catch (e: any) {
      toastError(e.message);
    }
  };

  const onFailure = () => {
    toastError('Oops. Something went wrong!');
  };

  return (
    <GuestPage>
      <Box className="login">
        <Flex
          className="login__container"
          flexDirection={'column'}
          alignItems={'center'}
          gap={'30px'}
        >
          <Box mt={'50px'}>
            <Text className="login__title">Sign in</Text>
            <Text className="login__text">to continue to admin page</Text>
          </Box>
          <GoogleLogin
            clientId={clientId}
            onSuccess={onSuccess}
            onFailure={onFailure}
            render={(renderProps) => (
              <Box className="login__btn" onClick={renderProps.onClick}>
                <GoogleIcon /> <Text>Sign in with Google</Text>
              </Box>
            )}
            cookiePolicy={'single_host_origin'}
          />
        </Flex>
      </Box>
    </GuestPage>
  );
};

export default LoginPage;
