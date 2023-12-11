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
import { useState } from 'react';
import '../styles/pages/LoginPage.scss';
import { toastError, toastSuccess } from 'src/utils/notify';
import rf from 'src/api/RequestFactory';
import { useDispatch } from 'react-redux';
import { setUserAuth, setUserProfile } from '../store/user';
import { useNavigate } from 'react-router-dom';
import { AppButton } from 'src/components';
import Storage from 'src/utils/storage';

// const clientId = config.auth.googleClientId;

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleEmailChange = (e: any) => setEmail(e.target.value);
  const handlePasswordChange = (e: any) => setPassword(e.target.value);

  const isError = email === '' || password === '';

  const onSubmit = async () => {
    try {
      const res = await rf.getRequest('AuthRequest').login({ email, password });
      dispatch(setUserAuth({ accessToken: res.access_token }));
      const role = Storage.getRole();
      if (res && res.access_token) {
        const dataInfo = await rf.getRequest('UserRequest').getProfile();
        dispatch(setUserProfile(dataInfo));
      }

      if (role === 'admin') {
        toastSuccess('Welcome to LongChau Dashboard!');
        navigate('/admin');
      } else if (role === 'branch_admin') {
        toastSuccess('Welcome to LongChau Dashboard!');
        navigate('/branch-admin');
      } else if (role === 'staff') {
        toastSuccess('Welcome to LongChau Dashboard!');
        navigate('/staff');
      } else {
        toastSuccess('Welcome to LongChau!');
        navigate('/');
      }
    } catch (e: any) {
      toastError(e.message);
    }
  };

  const handlePasswordKeyDown = (e: any) => {
    if (e.key === 'Enter' && !isError) {
      onSubmit();
    }
  };

  return (
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
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              onKeyDown={handlePasswordKeyDown}
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
            <AppButton size="md" w="100%" onClick={() => navigate('/register')}>
              Đăng ký
            </AppButton>
          </Flex>
        </Flex>
        {/* Or
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
        /> */}
      </Flex>
    </Box>
  );
};

export default LoginPage;
