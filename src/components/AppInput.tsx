import {
  Input,
  InputProps,
  InputGroup,
  InputRightElement,
  InputLeftElement,
  FormLabel,
  FormControl,
  Text,
} from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';
import { StyleProps, forwardRef } from '@chakra-ui/system';
import React, { ReactNode, useEffect } from 'react';
import SimpleReactValidator from 'simple-react-validator';
import { useForceUpdate } from 'src/hooks';

interface ValidatorProps {
  validator: SimpleReactValidator;
  name: string;
  rule: string | Array<string | { [key: string]: unknown }>;
  options?: { [key: string]: unknown };
}

interface AppInputProps extends InputProps {
  variant?: 'main' | 'filled';
  validate?: ValidatorProps;
  readOnly?: boolean;
  size?: string;
  endAdornment?: ReactNode;
  startAdornment?: ReactNode;
  hiddenErrorHighlight?: boolean;
  hiddenErrorText?: boolean;
  label?: string;
  error?: boolean;
  errorClass?: string;
  handleBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

const AppInput = forwardRef(
  (
    {
      variant = 'main',
      size = 'lg',
      readOnly,
      startAdornment,
      endAdornment,
      validate,
      isRequired = false,
      hiddenErrorHighlight = false,
      hiddenErrorText = false,
      label,
      error,
      handleBlur,
      errorClass,
      ...props
    }: AppInputProps,
    ref,
  ) => {
    const forceRender = useForceUpdate();

    useEffect(() => {
      if (validate)
        validate.validator.element = (message: string) => (
          <Text className={errorClass} color={'red.100'}>
            {message}
          </Text>
        );
    }, [validate, errorClass]);

    const onBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      validate?.validator.showMessageFor(validate.name);
      forceRender();
      handleBlur?.(e);
    };

    const ableToHighlightError = validate && !hiddenErrorHighlight && !readOnly;
    const ableToShowErrorMessage = validate && !hiddenErrorText && !readOnly;

    const isInvalid =
      validate &&
      !!validate.validator.message(
        validate.name,
        props.value,
        validate.rule,
        validate.options,
      );

    return (
      <FormControl isRequired={isRequired}>
        {!!label && (
          <FormLabel mb={1} color="border.200" fontSize={'12px'}>
            {label}
          </FormLabel>
        )}
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
            paddingInline={props?.paddingInline}
            borderRadius={'6px'}
            style={{
              border:
                (ableToHighlightError && isInvalid) || error
                  ? '1px solid #f6465d'
                  : '',
            }}
          />
          {endAdornment && (
            <InputRightElement right={'14px'} children={<>{endAdornment}</>} />
          )}
        </InputGroup>
        {ableToShowErrorMessage &&
          validate.validator.message(
            validate.name,
            props.value,
            validate.rule,
            validate.options,
          )}
      </FormControl>
    );
  },
);

export default AppInput;

export const appInputStyles = {
  baseStyle: {
    field: {
      fontWeight: 400,
      borderRadius: '4px',
      '::-webkit-calendar-picker-indicator': {
        width: '20px',
        height: '20px',
      },
      fontSize: '12px',
    },
  },
  sizes: {
    sm: {
      field: {
        borderRadius: '4px',
      },
    },
  },
  variants: {
    main: (props: StyleProps) => ({
      field: {
        bg: mode('transparent', 'transparent')(props),
        border: '1px solid',
        fontSize: '12px',
        color: mode('black', 'black')(props),
        borderColor: mode('line.100', 'line.100')(props),
        _focus: {
          borderColor: mode('border.200', 'border.200')(props),
        },
        _placeholder: {
          color: mode('line.100', 'line.100')(props),
        },
        _disabled: {
          bg: mode('border.200', 'border.200')(props),
          border: '1px solid transparent',
          color: mode('white.100', 'white.100')(props),
        },
      },
    }),
    filled: (props: StyleProps) => ({
      field: {
        bg: mode('card.200', 'card.200')(props),
        border: '1px solid transparent',

        color: mode('white.100', 'white.100')(props),
        _hover: {
          bg: mode('card.200', 'card.200')(props),
        },
        _focus: {
          borderColor: mode('border.200', 'border.200')(props),
          bg: mode('card.200', 'card.200')(props),
        },
        _placeholder: {
          color: mode('white.100', 'white.100')(props),
        },
        _disabled: {
          bg: mode('card.200', 'card.200')(props),
          border: '1px solid transparent',

          color: mode('white.100', 'white.100')(props),
        },
      },
    }),
  },
};
