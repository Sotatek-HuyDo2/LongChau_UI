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
import { GuestAdminPage } from 'src/components/layouts';
import '../styles/pages/LoginPage.scss';
import { GoogleIcon } from 'src/assets/icons';
import { GoogleLogin } from 'react-google-login';
import { gapi } from 'gapi-script';
import config from 'src/config';
import { toastError, toastSuccess } from 'src/utils/notify';
import rf from 'src/api/RequestFactory';
import { useDispatch } from 'react-redux';
import { setUserAuth } from '../store/user';
import { useNavigate } from 'react-router-dom';
import { AppButton, AppInput } from 'src/components';
import { useEffectUnsafe } from 'src/hooks/useEffectUnsafe';
import jwt_decode from 'jwt-decode';

// const clientId = config.auth.googleClientId;

export interface IDataBody {
  email?: string;
  password?: string;
  firstName: string;
  lastName: string;
  phone: string;
}

interface IUser {
  role: string;
}
const RegisterPage = () => {
  const initData = {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phone: '',
  };

  const [dataBody, setDataBody] = useState<IDataBody>(initData);
  const navigate = useNavigate();

  const onSubmit = async () => {
    try {
      const res = await rf.getRequest('UserRequest').register(dataBody);
      if (res && res.access_token) {
        localStorage.setItem('token', res.access_token);
        const userRole: IUser = jwt_decode(res.access_token);
        if (userRole?.role === 'admin') {
          toastSuccess('Welcome to LongChau Admin!');
          navigate('/admin');
        } else {
          toastSuccess('Welcome to LongChau!');
          navigate('/');
        }
      }

      throw new Error('No role found for this user');
    } catch (e: any) {
      toastError(e.message);
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
        h={'500px'}
      >
        <Box mt={'50px'}>
          <Text className="login__title">Đăng kí tài khoản</Text>
        </Box>
        <Flex flexDirection={'column'} gap="15px" w="80%" alignItems="center">
          <AppInput
            label="Email"
            size="md"
            value={dataBody.email}
            onChange={(e: any) => {
              setDataBody({
                ...dataBody,
                email: e.target.value.trim(),
              });
            }}
          />
          <AppInput
            label="Mật khẩu"
            size="md"
            onChange={(e: any) => {
              setDataBody({
                ...dataBody,
                password: e.target.value.trim(),
              });
            }}
          />
          <Flex gap={2}>
            <AppInput
              label="Tên"
              size="md"
              onChange={(e: any) => {
                setDataBody({ ...dataBody, firstName: e.target.value.trim() });
              }}
            />
            <AppInput
              label="Họ"
              size="md"
              onChange={(e: any) => {
                setDataBody({ ...dataBody, lastName: e.target.value.trim() });
              }}
            />
          </Flex>
          <AppInput
            label="Số điện thoại"
            size="md"
            onChange={(e: any) => {
              setDataBody({ ...dataBody, phone: e.target.value.trim() });
            }}
          />
          <Flex flexDirection="row" w="100%" gap="10px">
            <AppButton size="md" w="100%" onClick={onSubmit}>
              Đăng ký
            </AppButton>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
};

export default RegisterPage;
