import { useRef, useState } from 'react';
import { AppInput } from 'src/components';
import { SearchExplorer } from 'src/assets/icons';
import {
  Box,
  Flex,
  InputGroup,
  InputRightElement,
  Tooltip,
} from '@chakra-ui/react';
import { AppDataTable, AppButton } from 'src/components';
import { useEffectUnsafe } from 'src/hooks/useEffectUnsafe';
import rf from 'src/api/RequestFactory';
import { AddIcon } from '@chakra-ui/icons';
import ModalAddNewTypeProduct from 'src/components/Modals/Category_and_Type/ModalAddNewType';
import ModalEditTypeProduct from 'src/components/Modals/Category_and_Type/ModalEditType';
import ModalDeleteTypeProduct from 'src/components/Modals/Category_and_Type/ModalDeleteType';
import { toastError } from 'src/utils/notify';

export interface ICategory {
  id: any;
  name: string;
  quality: number;
}

interface Props {
  categoriesID?: any;
}

const ProductTyByCategory = (props: Props) => {
  const { categoriesID } = props;
  const [valueSearch, setValueSearch] = useState<string>('');
  const [dataSearch, setDataSearch] = useState<ICategory[]>([]);
  const [params, setParams] = useState({});
  const [openModalAddNewTypeProduct, setModalAddNewTypeProduct] =
    useState<boolean>(false);
  const [openModalEditTypeProduct, setModalEditTypeProduct] =
    useState<boolean>(false);
  const [openModalDeleteTypeProduct, setModalDeleteTypeProduct] =
    useState<boolean>(false);
  const [dataModal, setDataModal] = useState<any>([]);
  const dataRef = useRef<ICategory[]>([]);
  const [id, setId] = useState<number>();

  const handleSearch = () => {
    let dataFilter = dataRef.current;

    if (valueSearch) {
      dataFilter = dataFilter.filter((item: ICategory) =>
        item.name.toLowerCase().includes(valueSearch.toLowerCase()),
      );
      setDataSearch(dataFilter);
    }
    setDataSearch(dataFilter);
  };

  const onReload = () => {
    setParams({ ...params });
  };

  useEffectUnsafe(() => {
    handleSearch();
  }, [valueSearch]);

  const getCategory = async () => {
    try {
      const res = await rf
        .getRequest('CategoryRequest')
        .getAllDrugsTypeByCateID(categoriesID);
      dataRef.current = res;
      setDataSearch(res);
      return {
        docs: res,
      };
    } catch (error) {
      return { docs: [] };
    }
  };

  const handleEditType = async (id: number) => {
    setId(id);
    try {
      const res = await rf
        .getRequest('CategoryRequest')
        .getDrugsTypeByCateID(id);
      setModalEditTypeProduct(true);
      setDataModal(res);
    } catch (error) {
      return { docs: [] };
    }
  };

  const handleDelete = (id: number) => {
    setModalDeleteTypeProduct(true);
    setId(id);
  };

  const deleteTypeProduct = async () => {
    try {
      await rf.getRequest('CategoryRequest').deleteDrugsTypeByID(id);
      onReload();
    } catch (error: any) {
      toastError(error.message);
    }
  };

  useEffectUnsafe(() => {
    getCategory();
  }, []);

  const _renderHeaderTable = () => {
    return (
      <Flex>
        <Box className="category--header-cell-body category--id">STT</Box>
        <Box className="category--header-cell-body category--name">Tên</Box>
        <Box className="category--header-cell-body category--action">
          Action
        </Box>
      </Flex>
    );
  };

  const _renderContentTable = (data: ICategory[]) => {
    return (
      <Box>
        {dataSearch.map((data: ICategory, index: number) => {
          return (
            <RowAddressTransactionTable
              data={data}
              key={`${index}-coin-table`}
              id={index + 1}
            />
          );
        })}
      </Box>
    );
  };

  const RowAddressTransactionTable: React.FC<{
    data: ICategory;
    id: number;
  }> = ({ data, id }) => {
    return (
      <Flex className="category--row-wrap" direction={'column'}>
        <Flex>
          <Flex className="category--cell-body category--id">
            <Box cursor={'pointer'}>{id}</Box>
          </Flex>
          <Box className="category--cell-body category--name">
            <Tooltip
              hasArrow
              className="tooltip-app"
              label={data.name ? data.name : ''}
              placement="top"
            >
              <Box
                whiteSpace="nowrap"
                overflow="hidden"
                textOverflow="ellipsis"
                maxW="550px"
                cursor="pointer"
              >
                {data.name ? data.name : '--'}
              </Box>
            </Tooltip>
          </Box>

          <Box
            className="category--cell-body category--action"
            cursor={'pointer'}
          >
            <AppButton size={'sm'}>Xem</AppButton>
            <AppButton
              size={'sm'}
              bg={'yellow.100'}
              ml={'3px'}
              onClick={() => handleEditType(data.id)}
            >
              Sửa
            </AppButton>
            <AppButton
              ml={'3px'}
              size={'sm'}
              bg={'red.100'}
              onClick={() => handleDelete(data.id)}
            >
              Xóa
            </AppButton>
          </Box>
        </Flex>
      </Flex>
    );
  };

  return (
    // <BaseAdminPage>
    <Box className="category" w="full">
      <Box className={'category__search'}>
        <Flex alignItems={'center'} justifyContent={'end'} gap={2}>
          {/* <Box className={'category__search-title'}>Thực phẩm chức năng:</Box> */}
          <Box className="category__search-input">
            <InputGroup>
              <AppInput
                color={'black'}
                placeholder="Nhập để tìm kiếm..."
                size="md"
                value={valueSearch}
                onChange={(e: any) => setValueSearch(e.target.value)}
              />
              <InputRightElement top="4px">
                <SearchExplorer />
              </InputRightElement>
            </InputGroup>
          </Box>
          <AppButton
            size={'md'}
            onClick={() => setModalAddNewTypeProduct(true)}
          >
            <Flex justify={'center'} align={'start'} gap={1}>
              <AddIcon />
              Thêm
            </Flex>
          </AppButton>
        </Flex>
      </Box>
      <Box mt={10} className="category-container">
        <AppDataTable
          requestParams={params}
          fetchData={getCategory}
          renderBody={_renderContentTable}
          renderHeader={_renderHeaderTable}
          size={10}
        />
      </Box>
      {openModalAddNewTypeProduct && (
        <ModalAddNewTypeProduct
          open={openModalAddNewTypeProduct}
          onClose={() => setModalAddNewTypeProduct(false)}
          onReload={onReload}
          categoriesID={categoriesID}
        />
      )}
      {openModalEditTypeProduct && (
        <ModalEditTypeProduct
          open={openModalEditTypeProduct}
          onClose={() => setModalEditTypeProduct(false)}
          onReload={onReload}
          categoriesID={categoriesID}
          data={dataModal}
          typeId={id}
        />
      )}
      {openModalDeleteTypeProduct && (
        <ModalDeleteTypeProduct
          open={openModalDeleteTypeProduct}
          onClose={() => setModalDeleteTypeProduct(false)}
          onConfirm={() => deleteTypeProduct()}
        />
      )}
    </Box>
    // </BaseAdminPage>
  );
};

export default ProductTyByCategory;
