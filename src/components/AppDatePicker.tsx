import { Flex } from '@chakra-ui/react';
import React, { FC } from 'react';
import ReactDatePicker, { ReactDatePickerProps } from 'react-datepicker';

export interface AppDatePickerProps extends ReactDatePickerProps {
  type?:
    | 'default' // MM/dd/yyyy hh:mm:ss - 02/09/2007 05:46:21
    | 'isoDate' // MM/dd/yyyy HH:MM:ss - 02/09/2007 17:46:21
    | 'fullDate' // MM/dd/yyyy - 02/09/2007
    | 'shortDate' // M/d/yy - 6/9/07
    | 'fullTime' // hh:mm:ss aa - 05:46:00 PM
    | 'shortTime' // h:mm aa - 5:46 PM
    | 'fullIsoTime' // HH:mm:ss - 17:46:00
    | 'isoTime'; // HH:mm - 17:46
}

export const AppDatePicker: FC<AppDatePickerProps> = ({
  type = 'default',
  ...props
}) => {
  const dateProps: Omit<ReactDatePickerProps, 'onChange'> = {};
  switch (type) {
    case 'default':
      dateProps.dateFormat = 'MM/dd/yyyy HH:mm:ss';
      dateProps.timeFormat = 'hh:mm aa';
      dateProps.timeIntervals = 5;
      dateProps.showTimeSelect = true;
      break;
    case 'isoDate':
      dateProps.dateFormat = 'MM/dd/yyyy HH:mm:ss';
      dateProps.timeFormat = 'HH:mm';
      dateProps.timeIntervals = 5;
      dateProps.showTimeSelect = true;
      break;
    case 'fullDate':
      dateProps.dateFormat = 'MM/dd/yyyy';
      break;
    case 'shortDate':
      dateProps.dateFormat = 'M/d/yy';
      break;
    case 'fullTime':
      dateProps.dateFormat = 'hh:mm:ss aa';
      dateProps.showTimeSelect = true;
      dateProps.timeIntervals = 5;
      dateProps.showTimeSelectOnly = true;
      break;
    case 'shortTime':
      dateProps.dateFormat = 'h:mm aa';
      dateProps.timeIntervals = 5;
      dateProps.showTimeSelect = true;
      dateProps.showTimeSelectOnly = true;
      break;
    case 'fullIsoTime':
      dateProps.dateFormat = 'HH:mm:ss';
      dateProps.timeFormat = 'HH:mm';
      dateProps.timeIntervals = 5;
      dateProps.showTimeSelect = true;
      dateProps.showTimeSelectOnly = true;
      break;
    case 'isoTime':
      dateProps.dateFormat = 'HH:mm';
      dateProps.timeFormat = 'HH:mm';
      dateProps.timeIntervals = 5;
      dateProps.showTimeSelect = true;
      dateProps.showTimeSelectOnly = true;
      break;
  }

  return (
    <Flex>
      <ReactDatePicker {...props} {...dateProps} />
    </Flex>
  );
};
