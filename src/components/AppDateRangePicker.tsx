import { Flex, Input } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import { PickDateIcon } from 'src/assets/icons';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import 'src/styles/components/AppDateRangePicker.scss';

interface IParams {
  endTime?: number | null;
  startTime?: number | null;
}

interface IDateRangePicker {
  params?: IParams;
  setParams: React.Dispatch<React.SetStateAction<IParams>>;
  notEffectSetParams?: boolean;
  paramsNull?: boolean;
}

const DateRangePicker = (props: IDateRangePicker) => {
  const { setParams, params, notEffectSetParams, paramsNull } = props;
  const [startTime, setStartTime] = useState<any>(null);
  const [endTime, setEndTime] = useState<any>(null);

  const dateNow = new Date();

  useEffect(() => {
    if (!notEffectSetParams) {
      setParams((pre) => ({
        ...pre,
        startTime: startTime
          ? moment(startTime).startOf('day').valueOf()
          : undefined,
        endTime: endTime ? moment(endTime).endOf('day').valueOf() : undefined,
      }));
    }
  }, [startTime, endTime]);

  const handleSetParams = (value: any, isStart?: boolean) => {
    let obj: any = { startTime: moment(value).startOf('day').valueOf() };
    if (!isStart) {
      obj = { endTime: moment(value).endOf('day').valueOf() };
    }
    setParams((pre) => ({
      ...pre,
      ...obj,
    }));
  };

  const handleChangeStartTime = (value: never) => {
    setStartTime(value);
    handleSetParams(value, true);
  };

  const handleChangeEndTime = (value: never) => {
    setEndTime(value);
    handleSetParams(value);
  };

  useEffect(() => {
    if (!notEffectSetParams) {
      setStartTime(params?.startTime || null);
      setEndTime(params?.endTime || null);
    }
  }, [params]);

  useEffect(() => {
    if (notEffectSetParams && paramsNull) {
      setStartTime(null);
      setEndTime(null);
    }
  }, [paramsNull]);

  return (
    <Flex alignItems={'center'}>
      <div className="main-range">
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
          mr={3}
        />
        <span>To</span>
        <Input
          ml={3}
          size={'sm'}
          as={DatePicker}
          selected={endTime}
          value={endTime ? moment(endTime).format('yyyy/MM/DD') : ''}
          onChange={handleChangeEndTime}
          selectsEnd
          minDate={startTime}
          maxDate={dateNow}
          startDate={startTime}
          endDate={endTime}
          dateFormat="yyyy/MM/dd"
          placeholderText="YYYY-MM-DD"
        />
      </div>
      <PickDateIcon />
    </Flex>
  );
};

export default DateRangePicker;
