import {
  Box,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  Text,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
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
import { AppButton } from 'src/components';

const clientId = config.auth.googleClientId;

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFailure = () => {
    toastError('Oops. Something went wrong!');
  };

  const handleEmailChange = (e: any) => setEmail(e.target.value);
  const handlePasswordChange = (e: any) => setPassword(e.target.value);

  const isError = email === '' || password === '';

  const onSubmit = () => {
    alert('Email: ' + email + '\nPassword: ' + password);
    // if (!isError){
    //   rf.post('/users/signin',{username : email , password})
    //   .then((res)=>{
    //     console.log("response", res);
    //     localStorage.setItem('token', res?.data?.accessToken);
    //     // @ts-ignore
    //     window.location.reload();
    //     return true;
    //     })
    //     .catch(()=>toastError('Invalid username or password'))
    //     }else{
    //       toastError('Please fill all fields')
  };

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

  return (
    <GuestPage>
      <Box className="login">
        <Flex
          className="login__container"
          flexDirection={'column'}
          alignItems={'center'}
          gap={'20px'}
          color="black"
        >
          <Box mt={'50px'}>
            <Text className="login__title">Sign in</Text>
            <Text className="login__text">to continue to admin page</Text>
          </Box>
          <Flex flexDirection={'column'} gap="20px" w="80%" alignItems="center">
            <FormControl isInvalid={isError}>
              <FormLabel htmlFor="email">Email</FormLabel>
              <Input id="email" value={email} onChange={handleEmailChange} />
              <FormLabel htmlFor="password" mt="10px">
                Mật khẩu
              </FormLabel>
              <Input
                id="password"
                value={password}
                onChange={handlePasswordChange}
              />
              {!isError ? (
                <FormHelperText>
                  Enter the input you'd like to receive the newsletter on.
                </FormHelperText>
              ) : (
                <FormErrorMessage>Input is required.</FormErrorMessage>
              )}
            </FormControl>
            <Flex flexDirection="row" w="100%" gap="10px">
              <AppButton
                onClick={onSubmit}
                size="md"
                w="100%"
                variant="formTrade"
              >
                Đăng nhập
              </AppButton>
              <AppButton onClick={onSubmit} size="md" w="100%">
                Đăng ký
              </AppButton>
            </Flex>
          </Flex>
          Or
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
