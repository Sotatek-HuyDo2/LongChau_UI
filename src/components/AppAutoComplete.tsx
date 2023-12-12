import {
  Input,
  InputProps,
  InputGroup,
  InputRightElement,
  InputLeftElement,
  Box,
  Flex,
  useForceUpdate,
} from '@chakra-ui/react';
import { forwardRef } from '@chakra-ui/system';
import { ReactNode, useEffect, useState, useRef, useMemo } from 'react';

import 'src/styles/components/AppAutoComplete.scss';
import { CloseIcon } from '@chakra-ui/icons';
import { includes } from 'lodash';

interface AppAutoCompleteProps extends InputProps {
  variant?: 'main' | 'filled';
  readOnly?: boolean;
  size?: string;
  endAdornment?: ReactNode;
  startAdornment?: ReactNode;
  searchValue?: string;
  label?: string;
  handleBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onChangeSelect?: (e: string) => void;
  onChangeSearch?: (e: string) => void;
  onClear?: () => void;
  options: IAppAutoCompleteOption[];
}

export interface IAppAutoCompleteOption {
  value: string;
  label: string;
  icon?: string;
  name?: string;
}

const AppAutoComplete = forwardRef(
  (
    {
      options,
      onChangeSelect,
      variant = 'main',
      size = 'lg',
      readOnly,
      startAdornment,
      handleBlur,
      value,
      searchValue,
      onChangeSearch,
      onClear,
      ...props
    }: AppAutoCompleteProps,
    ref,
  ) => {
    const [open, setOpen] = useState<boolean>(false);
    const [search, setSearch] = useState<string>('');
    const refAutoComplete = useRef<any>(null);

    const forceRender = useForceUpdate();

    const handleClickOutside = (event: any) => {
      if (
        refAutoComplete.current &&
        !refAutoComplete.current?.contains(event.target)
      ) {
        setOpen(false);
      }
    };

    const handleClose = (event: any) => {
      event.stopPropagation();
      onChangeSelect?.('');
      setSearch('');
      onClear?.();
    };

    const handleSelect = (e: any, option: IAppAutoCompleteOption) => {
      e.stopPropagation();
      onChangeSelect?.(option.value);
      setSearch(option.label);
      setOpen(false);
    };

    const filterOption: IAppAutoCompleteOption[] = useMemo(() => {
      return options.filter((el) =>
        includes(el.label?.toUpperCase(), search?.toUpperCase()),
      );
    }, [search, options]);

    const onBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      forceRender();
      handleBlur?.(e);
    };

    const onClickAutoComplete = () => {
      setOpen(true);
    };

    const onChangeAutoComplete = (e: React.ChangeEvent<HTMLInputElement>) => {
      const valueInput = e.target.value;
      setSearch(valueInput);
      onChangeSearch?.(valueInput);
      setOpen(true);
      if (!valueInput) {
        onChangeSelect?.('');
      }
    };

    useEffect(() => {
      document.addEventListener('click', handleClickOutside, true);
      return () => {
        document.removeEventListener('click', handleClickOutside, true);
      };
    }, []);

    useEffect(() => {
      onChangeSearch?.(search);
    }, [search]);

    useEffect(() => {
      if (!searchValue) {
        setSearch('');
      }
    }, [searchValue]);

    useEffect(() => {
      if (value) {
        const findItem = options?.find((el) => el.value === value);
        setSearch(findItem?.label || '');
      } else {
        setSearch('');
      }
    }, [value, options]);

    return (
      <Box
        className="app-autocomplete"
        ref={refAutoComplete}
        onClick={onClickAutoComplete}
      >
        <InputGroup size={size}>
          {startAdornment && (
            <InputLeftElement
              pointerEvents="none"
              children={<>{startAdornment}</>}
            />
          )}
          <Input
            {...props}
            variant={variant}
            ref={ref}
            readOnly={readOnly}
            onBlur={onBlur}
            value={search}
            borderRadius={'6px'}
            onChange={onChangeAutoComplete}
            paddingInline={props?.paddingInline}
          />
          {search && (
            <InputRightElement
              children={
                <Flex
                  alignItems={'center'}
                  justifyContent="center"
                  className="app-autocomplete__icon-close"
                  onClick={handleClose}
                >
                  <CloseIcon boxSize={1.5} />
                </Flex>
              }
            />
          )}
        </InputGroup>

        {open && !!filterOption.length && (
          <Box className={'app-autocomplete__menu'}>
            {filterOption.map(
              (option: IAppAutoCompleteOption, index: number) => {
                return (
                  <Flex
                    key={option.value + index}
                    className={`app-autocomplete__menu-item ${
                      value === option.value ? 'selected' : ''
                    }`}
                    onClick={(e) => handleSelect(e, option)}
                  >
                    {option?.icon && <Box className={`${option?.icon} icon`} />}
                    <Box>{option.label}</Box>
                  </Flex>
                );
              },
            )}
          </Box>
        )}
      </Box>
    );
  },
);

export default AppAutoComplete;
