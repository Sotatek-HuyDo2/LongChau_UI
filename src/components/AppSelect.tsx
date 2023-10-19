import React, { FC, useMemo, useEffect, useRef, useState } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import 'src/styles/components/AppSelect.scss';
import { ArrowDownIcon } from '../assets/icons';

interface IAppSelectOption {
  value: string;
  label: string;
  icon?: string;
  name?: string;
}

interface IAppSelectPops {
  options: IAppSelectOption[];
  value: string;
  className?: string;
  width?: string;
  size?: 'small' | 'medium' | 'large';
  onChange: (value: string) => void;
  disabled?: boolean;
  showBadge?: boolean;
  showFullName?: boolean;
  iconSelect?: JSX.Element;
}

const AppSelect: FC<IAppSelectPops> = ({
  options,
  value,
  onChange,
  width,
  size = 'small',
  className,
  disabled,
  showBadge = false,
  showFullName = false,
  iconSelect,
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const ref = useRef<any>(null);

  const optionSelected = useMemo(
    () => options.find((item: IAppSelectOption) => item.value === value),
    [value, options],
  );

  const handleClickOutside = (event: any) => {
    if (ref.current && !ref.current?.contains(event.target)) {
      setOpen(false);
    }
  };

  const handleClickSelect = () => {
    !disabled && setOpen(!open);
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);

  return (
    <Box
      className={`app-select ${size} ${className} ${
        disabled ? 'app-select__disabled' : ''
      }`}
      width={width}
      ref={ref}
    >
      <Flex className="app-select__btn-select" onClick={handleClickSelect}>
        <Flex className="app-select__btn-select__content" alignItems={'center'}>
          {optionSelected?.icon && (
            <Box className={`${optionSelected?.icon} icon`} />
          )}

          <Box className="app-select__menu-label">
            {optionSelected?.label ?? 'Select'}
          </Box>
          {showBadge && (
            <Box className="app-select__badge">
              {optionSelected?.value.toUpperCase()}
            </Box>
          )}
          {showFullName && optionSelected?.name && (
            <Box className="app-select__name">
              {optionSelected?.name.toUpperCase()}
            </Box>
          )}
        </Flex>

        <Box className="app-select__arrow-icon" ml={2}>
          {iconSelect || <ArrowDownIcon />}
        </Box>
      </Flex>
      {open && (
        <Box className={'app-select__menu'}>
          {options.map((option: IAppSelectOption, index: number) => {
            return (
              <Flex
                key={index}
                justifyContent={'space-between'}
                className={`app-select__menu-item ${
                  value === option.value ? 'selected' : ''
                }`}
                onClick={() => {
                  onChange(option.value);
                  setOpen(false);
                }}
              >
                <Flex>
                  {option?.icon && <Box className={`${option?.icon} icon`} />}
                  <Box className="app-select__menu-label">{option.label}</Box>
                </Flex>
              </Flex>
            );
          })}
        </Box>
      )}
    </Box>
  );
};

export default AppSelect;
