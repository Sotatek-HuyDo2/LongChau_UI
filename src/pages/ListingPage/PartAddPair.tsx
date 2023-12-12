import { useState, useRef, useEffect, useMemo } from 'react';
import 'src/styles/pages/DelistPage.scss';
import { Box, Flex, Text } from '@chakra-ui/react';
import { AppInput, AppButton, AppSelect } from 'src/components';
import { isNumberDecimalAfter } from 'src/utils/helpers';
import { createValidator } from 'src/utils/validator';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';
import _ from 'lodash';

interface IDataForm {
  baseToken: string;
  quoteToken: string;
  basePrecision: string;
  quotePrecision: string;
  minimumQuantity: string;
  maximumQuantity: string;
}

const PartAddPair = () => {
  const initData = {
    baseToken: '',
    quoteToken: '',
    basePrecision: '',
    quotePrecision: '',
    minimumQuantity: '',
    maximumQuantity: '',
  };

  const [dataForm, setDataForm] = useState<IDataForm>(initData);
  const [isDisableSubmit, setIsDisableSubmit] = useState<boolean>(true);
  const [openModalListingConfirm, setOpenModalListingConfirm] =
    useState<boolean>(false);
  const { currencies } = useSelector((state: RootState) => state.metadata);

  // @ts-ignore
  const validator = useRef(
    createValidator({
      element: (message: string) => (
        <Text className="text-error">{message}</Text>
      ),
    }),
  );

  useEffect(() => {
    const isDisabled = !validator.current.allValid();
    setIsDisableSubmit(isDisabled);
  }, [dataForm]);

  const baseTokenOptions = useMemo(() => {
    let listCurrency = _.uniqBy(currencies, 'id');

    if (dataForm.quoteToken) {
      listCurrency = listCurrency.filter(
        (item) => item.id !== +dataForm.quoteToken,
      );
    }

    return listCurrency.map((item) => {
      return {
        value: item.id.toString(),
        icon: item.icon,
        label: item.symbol,
      };
    });
  }, [currencies, dataForm.quoteToken]);

  const quoteTokenOptions = useMemo(() => {
    let listCurrency = _.uniqBy(currencies, 'id');

    if (dataForm.baseToken) {
      listCurrency = listCurrency.filter(
        (item) => item.id !== +dataForm.baseToken,
      );
    }

    return listCurrency.map((item) => {
      return {
        value: item.id.toString(),
        icon: item.icon,
        label: item.symbol,
      };
    });
  }, [currencies, dataForm.baseToken]);

  return (
    <Box my={10}>
      <Flex alignItems={'flex-start'}>
        <Box className={'field'}>
          <Box className={'field__title'}>Base token</Box>
          <Box>
            <AppSelect
              width={'200px'}
              options={baseTokenOptions}
              value={dataForm.baseToken}
              onChange={(token: string) =>
                setDataForm({
                  ...dataForm,
                  baseToken: token,
                })
              }
              size="medium"
              showFullName
            />
          </Box>
        </Box>

        <Box className={'field'}>
          <Box className={'field__title'}>Quote token</Box>
          <Box>
            <AppSelect
              width={'200px'}
              options={quoteTokenOptions}
              value={dataForm.quoteToken}
              onChange={(token: string) =>
                setDataForm({
                  ...dataForm,
                  quoteToken: token,
                })
              }
              size="medium"
              showFullName
            />
          </Box>
        </Box>
      </Flex>

      <Flex mt={6} flexWrap={'wrap'}>
        <Flex alignItems={'flex-start'} flexWrap={'wrap'}>
          <Box className={'field'}>
            <Box className={'field__title'}>Base precision</Box>
            <Box>
              <AppInput
                type="number"
                placeholder={'Base precision'}
                size="md"
                value={dataForm.basePrecision}
                onChange={(e) =>
                  setDataForm({
                    ...dataForm,
                    basePrecision: e.target.value,
                  })
                }
                validate={{
                  name: `basePrecision`,
                  validator: validator.current,
                  rule: ['required'],
                }}
              />
            </Box>
          </Box>

          <Box className={'field'}>
            <Box className={'field__title'}>Quote precision</Box>
            <Box>
              <AppInput
                type="number"
                placeholder={'Quote precision'}
                size="md"
                value={dataForm.quotePrecision}
                onChange={(e) =>
                  setDataForm({
                    ...dataForm,
                    quotePrecision: e.target.value,
                  })
                }
                validate={{
                  name: `quotePrecision`,
                  validator: validator.current,
                  rule: ['required'],
                }}
              />
            </Box>
          </Box>

          <Box className={'field'}>
            <Box className={'field__title'}>Minimum quantity</Box>
            <Box>
              <AppInput
                placeholder={'Minimum quantity'}
                size="md"
                value={dataForm.minimumQuantity}
                onChange={(e) => {
                  if (
                    isNumberDecimalAfter(e.target.value) ||
                    e.target.value === ''
                  ) {
                    setDataForm({
                      ...dataForm,
                      minimumQuantity: e.target.value,
                    });
                  }
                }}
                validate={{
                  name: `minimumQuantity`,
                  validator: validator.current,
                  rule: ['required'],
                }}
              />
            </Box>
          </Box>

          <Box className={'field'}>
            <Box className={'field__title'}>Maximum quantity</Box>
            <Box>
              <AppInput
                placeholder={'Maximum quantity'}
                size="md"
                value={dataForm.maximumQuantity}
                onChange={(e) => {
                  if (
                    isNumberDecimalAfter(e.target.value) ||
                    e.target.value === ''
                  ) {
                    setDataForm({
                      ...dataForm,
                      maximumQuantity: e.target.value,
                    });
                  }
                }}
                validate={{
                  name: `maximumQuantity`,
                  validator: validator.current,
                  rule: ['required'],
                }}
              />
            </Box>
          </Box>
        </Flex>

        <Box mt={6}>
          <AppButton
            isDisabled={isDisableSubmit}
            w={'150px'}
            onClick={() => setOpenModalListingConfirm(true)}
          >
            Listing
          </AppButton>
        </Box>
      </Flex>

      {/* {openModalListingConfirm && (
        <ModalListingConfirm
          open={openModalListingConfirm}
          onClose={() => setOpenModalListingConfirm(false)}
          data={dataForm}
        />
      )} */}
    </Box>
  );
};

export default PartAddPair;
