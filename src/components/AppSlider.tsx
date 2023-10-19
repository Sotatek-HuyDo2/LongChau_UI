import {
  Slider,
  SliderFilledTrack,
  SliderMark,
  SliderThumb,
  SliderTrack,
  SliderProps,
  Box,
  Popover,
  PopoverTrigger as OrigPopoverTrigger,
  PopoverContent,
  PopoverBody,
  Tooltip,
} from '@chakra-ui/react';
import React, { useState } from 'react';

import { RadioIcon } from 'src/assets/icons';
import 'src/styles/components/AppSlider.scss';
import { forwardRef } from 'react';
import { isNumber } from 'lodash';

export interface IAppSlider extends SliderProps {
  marks: number[];
  classSlider?: string;
  tooltip?: string;
  tooltipValues?: number[];
}

export const PopoverTrigger: React.FC<{ children: React.ReactNode }> =
  OrigPopoverTrigger;
const DELAY_TIMEOUT = 4000;

const AppSlider = forwardRef<HTMLInputElement, IAppSlider>((props, ref) => {
  const {
    children,
    marks,
    value,
    onChange,
    classSlider,
    tooltip,
    tooltipValues,
  } = props;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [clickValue, setClickValue] = useState<number>(value || 0);
  const timeoutIdRef = React.useRef<any>();

  const handleChange = (e: number) => {
    onChange?.(e);
    setIsOpen(true);
    setClickValue(e);

    clearTimeout(timeoutIdRef.current);
    timeoutIdRef.current = setTimeout(() => {
      setIsOpen(false);
    }, DELAY_TIMEOUT);
  };

  return (
    <>
      <Popover
        placement="top"
        isOpen={isOpen && tooltipValues?.includes(clickValue)}
      >
        <PopoverTrigger>
          <Box />
        </PopoverTrigger>
        <PopoverContent border={'none'} className={'box-msg'} bg="#282a38">
          <PopoverBody fontSize={'13px'}>{tooltip}</PopoverBody>
        </PopoverContent>
      </Popover>
      <Box className="slider-comp">
        <Slider
          className={` ${classSlider} ${
            props.isDisabled ? 'disable-slider' : ''
          } `}
          {...props}
          onChange={handleChange}
          value={value}
          ref={ref}
        >
          <SliderTrack bg="#414558">
            <SliderFilledTrack bg={'#5367fe'} />
          </SliderTrack>

          {marks?.map((el, index) => (
            <SliderMark
              key={index}
              value={el}
              className={`slider-comp__mark ${
                isNumber(value) && value < el ? '' : 'slider-comp__mark-active'
              }`}
            />
          ))}

          <SliderThumb className="slider-comp__thumb" boxSize={'14px'}>
            <Box position={'relative'}>
              <Box className="slider-comp__thumb-radio" as={RadioIcon} />
              <Box
                position={'absolute'}
                className="slider-comp__mark-value"
              >{`${value}%`}</Box>
            </Box>
          </SliderThumb>
          {children}
        </Slider>
      </Box>
    </>
  );
});

export default AppSlider;
