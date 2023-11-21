import { Box, Flex, Image } from '@chakra-ui/react';
import React from 'react';
import { AppButton } from 'src/components';

interface IProfile {
  name: string;
  imageUrl: string;
  phone: string;
  sex: string;
  DOB: string;
}

const ProfilePart: React.FC<{ profile?: IProfile }> = ({ profile }) => {
  return (
    <Flex
      w={'67%'}
      color={'black'}
      bg={'white'}
      p={'20px 10px'}
      borderRadius={'8px'}
      flexDir={'column'}
      alignItems={'center'}
      gap={'20px'}
    >
      <Box borderBottom={'1px solid #a4a7b7'} w={'full'} pb={'10px'}>
        Thông tin cá nhân
      </Box>
      <Flex flexDir={'column'} w={'400px'} alignItems={'center'} gap={'10px'}>
        <Image
          w={'30%'}
          src="https://nhathuoclongchau.com.vn/estore-images/profile/v2/avatar-profile-large.svg"
        />
        <Flex
          w={'full'}
          justifyContent={'space-between'}
          pb={'10px'}
          borderBottom={'1px solid #a4a7b7'}
        >
          <Box>Họ và tên</Box>
          <Box>{profile?.name}</Box>
        </Flex>
        <Flex
          w={'full'}
          justifyContent={'space-between'}
          pb={'10px'}
          borderBottom={'1px solid #a4a7b7'}
        >
          <Box>Số điện thoại</Box>
          <Box>{profile?.phone}</Box>
        </Flex>
        <Flex
          w={'full'}
          justifyContent={'space-between'}
          pb={'10px'}
          borderBottom={'1px solid #a4a7b7'}
        >
          <Box>Giới tính</Box>
          <Box>{profile?.sex === 'male' ? 'Nam' : 'Nữ'}</Box>
        </Flex>
        <Flex
          w={'full'}
          justifyContent={'space-between'}
          pb={'10px'}
          borderBottom={'1px solid #a4a7b7'}
        >
          <Box>Ngày sinh</Box>
          <Box>{profile?.DOB}</Box>
        </Flex>
      </Flex>
      <AppButton borderRadius={'50px'} size="lg">
        Chỉnh sửa thông tin
      </AppButton>
    </Flex>
  );
};

export default ProfilePart;
