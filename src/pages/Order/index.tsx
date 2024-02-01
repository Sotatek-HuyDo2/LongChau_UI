import React, { useEffect, useState } from 'react';
import BaseHomePage from 'src/components/layouts/HomePage/BaseHomePage';
import NoProduct from '../NoProduct';
import {
  Box,
  Flex,
  Img,
  Input,
  Table,
  TableCaption,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { AppButton, AppSelect } from 'src/components';
import rf from 'src/api/RequestFactory';
import { toastError, toastSuccess } from 'src/utils/notify';
import { AddIcon, MinusIcon } from '@chakra-ui/icons';

const Order = () => {
  const [dataDrugs, setDataDrugs] = useState<any[]>([]);
  const [branch, setBranch] = useState([]);
  const [selectBranch, setSelectBranch] = useState<number | null>(null);
  const [_, setToggleLoading] = useState<boolean>(false);

  useEffect(() => {
    const listData = localStorage.getItem('listOrderDrugs');
    if (listData) {
      setDataDrugs(JSON.parse(listData));
    }

    const getAllBranch = async () => {
      try {
        const res = await rf.getRequest('BranchRequest').getBranchList();
        const selectData = res.map((r: any) => ({
          value: r.id,
          label: r.name,
        }));
        setBranch(selectData);
      } catch (e: any) {
        setBranch([]);
      }
    };
    getAllBranch();
  }, []);

  const onBuyNow = async () => {
    if (!selectBranch) {
      toastError('Vui lòng chọn chi nhánh');
      return;
    }
    const orderDrugs: any[] = JSON.parse(
      localStorage.getItem('listOrderDrugs') as any,
    );
    const drugs = orderDrugs.map((orderDrug) => {
      return { drugId: orderDrug.id, quantity: orderDrug.quantity };
    });
    const myProfile = await rf.getRequest('UserRequest').getProfile();
    const newOrder = {
      userId: myProfile.userId,
      branchId: selectBranch,
      drugs,
    };
    await rf.getRequest('OrderRequest').createdOrder(newOrder);
    localStorage.removeItem('listOrderDrugs');
    toastSuccess('Mua hàng thành công');
    setTimeout(() => {
      location.reload();
    }, 500);
  };

  const _renderListDrugSelect = () => {
    return (
      <Flex justify={'center'} minH={'100vh'} w={'full'}>
        <Box width={'full'} p={10}>
          <Table w={'full'} color={'gray.400'}>
            <TableCaption
              style={{ captionSide: 'top' }}
              fontWeight={'semibold'}
              fontSize={'2xl'}
              mb={4}
            >
              Các sản phẩm đã chọn
            </TableCaption>
            <Thead>
              <Tr>
                <Th>STT</Th>
                <Th>Tên sản phẩm</Th>
                <Th>Giá bán</Th>
                <Th>Số lượng</Th>
              </Tr>
            </Thead>
            <Tbody>
              {dataDrugs.map((item, index) => (
                <Tr key={index}>
                  <Td>{index + 1}</Td>
                  <Td>
                    <Flex alignItems={'center'}>
                      <Img src={item.img} alt={item.name} w={'40px'} mr={4} />
                      {item.name}
                    </Flex>
                  </Td>
                  <Td>{item.price}</Td>
                  <Td>
                    <Flex alignItems={'center'} userSelect={'none'}>
                      <MinusIcon
                        boxSize={5}
                        cursor={'pointer'}
                        onClick={() => {
                          const newData = dataDrugs;
                          newData[index].quantity = item.quantity - 1;
                          if (newData[index].quantity <= 0)
                            newData[index].quantity = 0;
                          setDataDrugs(newData);
                          localStorage.setItem(
                            'listOrderDrugs',
                            JSON.stringify(newData),
                          );
                          setToggleLoading((toggle) => !toggle);
                        }}
                      />
                      <Input
                        w={'60px'}
                        p={1}
                        borderRadius={'none'}
                        border={'1px solid #e5e7eb'}
                        textAlign={'center'}
                        type="number"
                        fontSize={18}
                        defaultValue={dataDrugs[index].quantity}
                        onChange={(e) => {
                          const newData = dataDrugs;
                          newData[index].quantity = +e.target.value;
                          setDataDrugs(newData);
                          localStorage.setItem(
                            'listOrderDrugs',
                            JSON.stringify(newData),
                          );
                          setToggleLoading((toggle) => !toggle);
                        }}
                        value={item.quantity}
                      />
                      <AddIcon
                        boxSize={5}
                        cursor={'pointer'}
                        onClick={() => {
                          const newData = dataDrugs;
                          newData[index].quantity = item.quantity + 1;
                          setDataDrugs(newData);
                          localStorage.setItem(
                            'listOrderDrugs',
                            JSON.stringify(newData),
                          );
                          setToggleLoading((toggle) => !toggle);
                        }}
                      />
                    </Flex>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>

          <Flex
            alignItems={'center'}
            mt={10}
            w={'full'}
            pt={10}
            borderTop={'1px solid rgba(0, 0, 0, .5)'}
          >
            <Flex justify={'end'} w={'full'} alignItems={'end'} gap={10}>
              <Box w={'400px'}>
                <AppSelect
                  label="Chọn Chi nhánh"
                  width={'full'}
                  options={branch}
                  value={selectBranch || ''}
                  onChange={(value: string) => {
                    setSelectBranch(+value);
                  }}
                  size="medium"
                  showFullName
                />
              </Box>
              <Box>
                <AppButton flex={1} onClick={onBuyNow} w={'200px'}>
                  Mua ngay
                </AppButton>
              </Box>
            </Flex>
          </Flex>
        </Box>
      </Flex>
    );
  };

  return (
    <BaseHomePage>
      <Flex bg={'#f4f6f9'}>
        {dataDrugs.length ? _renderListDrugSelect() : <NoProduct />}
      </Flex>
    </BaseHomePage>
  );
};

export default Order;
