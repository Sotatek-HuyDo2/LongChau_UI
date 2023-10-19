import { Box, Flex, Input } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { PickDateIcon } from 'src/assets/icons';
import 'src/styles/components/AppDateRangePicker.scss';
import moment from 'moment';

interface IDateRangePicker {
  value: [number | null, number | null];
  onChangeRange?: (value: [number | null, number | null]) => void;
  disabled?: boolean;
}

const SingleInputDateRangePicker = (props: IDateRangePicker) => {
  const { value, onChangeRange, disabled } = props;

  const [startTime, setStartTime] = useState<any>(null);
  const [endTime, setEndTime] = useState<any>(null);
  const [isOpenEnd, setIsOpenEnd] = useState<boolean>(false);

  const dateNow = new Date();

  const handleChangeStartTime = (startDate: never) => {
    setStartTime(startDate);
    setEndTime(null);
    onChangeRange?.([startDate ? moment(startDate).valueOf() : null, null]);
    setIsOpenEnd(true);
  };

  const handleChangeEndTime = (endDate: never) => {
    setEndTime(endDate);
    onChangeRange?.([value[0], endDate ? moment(endDate).valueOf() : null]);
    setIsOpenEnd(false);
  };

  const handleFocus = () => setIsOpenEnd(true);
  const handleClickOutside = () => setIsOpenEnd(false);

  useEffect(() => {
    const [startDate, endDate] = value;
    if (startDate) {
      setStartTime(startDate || null);
    }
    if (endDate) {
      setEndTime(endDate || null);
    }
    return () => {
      setStartTime(null);
      setEndTime(null);
    };
  }, [value]);

  return (
    <Flex
      className={`main-single-range ${disabled ? 'disabled' : ''}`}
      alignItems={'center'}
    >
      <Box className="start-input">
        <Input
          size={'sm'}
          as={DatePicker}
          selected={startTime}
          value={startTime ? moment(startTime).format('yyyy/MM/DD') : ''}
          onChange={handleChangeStartTime}
          selectsStart
          maxDate={endTime || dateNow}
          startDate={startTime}
          endDate={endTime}
          dateFormat="yyyy/MM/dd"
          placeholderText="YYYY-MM-DD"
          disabled={disabled}
        />
      </Box>
      <span>-</span>
      <Box className="end-input">
        <Input
          size={'sm'}
          as={DatePicker}
          selected={endTime}
          value={endTime ? moment(endTime).format('yyyy/MM/DD') : ''}
          onChange={handleChangeEndTime}
          open={isOpenEnd}
          selectsEnd
          minDate={startTime}
          maxDate={dateNow}
          startDate={startTime}
          endDate={endTime}
          dateFormat="yyyy/MM/dd"
          placeholderText="YYYY-MM-DD"
          disabled={disabled}
          onFocus={handleFocus}
          onClickOutside={handleClickOutside}
        />
      </Box>
      <Box className="icon">
        <PickDateIcon />
      </Box>
    </Flex>
  );
};

export default SingleInputDateRangePicker;
