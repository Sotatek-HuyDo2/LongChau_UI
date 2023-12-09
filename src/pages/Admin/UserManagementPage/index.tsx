import { Box, Text } from '@chakra-ui/react';
import { ReactNode, useState } from 'react';
import { BaseAdminPage } from 'src/components/layouts';
import { AppTabs } from 'src/components';
import 'src/styles/pages/ManageCategoryListPage.scss';
import rf from 'src/services/RequestFactory';
import { useEffectUnsafe } from 'src/hooks/useEffectUnsafe';
import CustomerManagementPage from './StaffManagementPage.part';

interface ITabs {
  id: string;
  name: string;
  content: ReactNode;
}

const UserManagerList = () => {
  const [staff, setStaff] = useState();
  const [branchAdmin, setBranchAdmin] = useState();

  const getStaff = async () => {
    try {
      const res = await rf.getRequest('UserRequest').getStaff();
      setStaff(res);
    } catch (e) {
      console.log(e);
    }
  };

  const getBranchAdmin = async () => {
    try {
      const res = await rf.getRequest('UserRequest').getBranchAdmin();
      setBranchAdmin(res);
    } catch (e) {
      console.log(e);
    }
  };

  useEffectUnsafe(() => {
    getStaff();
    getBranchAdmin();
  }, []);

  const tabs: ITabs[] = [
    {
      id: 'Staff',
      name: 'Staff',
      content: <CustomerManagementPage data={staff} />,
    },
    {
      id: 'branch-admin',
      name: 'Branch Admin',
      content: <CustomerManagementPage data={branchAdmin} showAddNew />,
    },
  ];

  return (
    <BaseAdminPage>
      <Box>
        <Box>
          <Text fontSize="24px" as="b" mr={'30px'} color={'#2167df'}>
            Quản lý nhân sự
          </Text>
        </Box>
        <Box mt={10}>
          <AppTabs tabs={tabs} />
        </Box>
      </Box>
    </BaseAdminPage>
    // <BaseAdminPage>
    //   <Box>
    //     <Box>
    //       <Text fontSize="24px" as="b" mr={'30px'} color={'#2167df'}>
    //         Quản lý Danh Mục
    //       </Text>
    //     </Box>
    //     <Box mt={10}>
    //       {tabs.map((item, index) => {
    //         return <Flex>{item.content}</Flex>;
    //       })}
    //     </Box>
    //   </Box>
    // </BaseAdminPage>
  );
};

export default UserManagerList;
