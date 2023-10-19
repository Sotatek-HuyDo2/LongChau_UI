import copy from 'copy-to-clipboard';
import { toastError, toastSuccess } from './notify';
import BigNumber from 'bignumber.js';
import { formatNumber } from './format';

export const COMMON_ERROR_MESSAGE = 'Something went wrong!';

export const isString = (value: unknown) => {
  return typeof value === 'string';
};

export const getErrorMessage = (err: any) => {
  const REGEX_GET_MESSAGE = /execution reverted:([^"]*)/gm;
  if (err.message?.includes('execution reverted:')) {
    const match = REGEX_GET_MESSAGE.exec(err.message);
    return match ? match[1] : COMMON_ERROR_MESSAGE;
  }
  if (isString(err)) {
    return err;
  }
  if (err.message && isString(err.message)) {
    return err.message;
  }
  return COMMON_ERROR_MESSAGE;
};

export const filterParams = (params: any) => {
  return Object.fromEntries(Object.entries(params).filter(([_, v]) => v));
};

export const copyToClipboard = (message: string) => {
  try {
    copy(message);
    toastSuccess('Copied');
  } catch (error) {
    toastError(getErrorMessage(error));
  }
};

export const isNumber = (value: string | number | undefined) => {
  return /^\d+(\.\d+)?$/.test(value?.toString() || '');
};

export const isNumberDecimalAfter = (
  value: string | number | undefined,
  decimal = 8,
) => {
  const precision = +decimal > 8 ? 8 : decimal;
  const valueNumber = value?.toString() || '';
  const FLOAT_NUMBER_FORMAT = new RegExp(
    `^(\\d+(\\.\\d{0,${precision}})?|\\.?\\d{0,${precision}})$`,
  );
  const REGEX_DECIMAL = /^0$|^[1-9]\d*$|^\.\d+$|^0\.\d*$|^[1-9]\d*\.\d*$/;

  return (
    REGEX_DECIMAL.test(valueNumber) && FLOAT_NUMBER_FORMAT.test(valueNumber)
  );
};

const getStartOfByResolution = (timestamp: number, resolution: number) => {
  return timestamp - (timestamp % resolution);
};

export const fillFullResolution = (
  from: number,
  to: number,
  resolution: number,
  data: any,
  sampleData: any,
) => {
  const dataByKey: any[] = [];
  data.map((e: any) => {
    dataByKey[e.timestamp] = e;
  });

  const result = [];
  const convertedResolution = resolution * 1000;
  let fromStartOfByResolution = getStartOfByResolution(
    from,
    convertedResolution,
  );

  const toStartOfByResolution = getStartOfByResolution(to, convertedResolution);

  while (fromStartOfByResolution <= toStartOfByResolution) {
    if (!dataByKey[fromStartOfByResolution]) {
      result.push({
        ...sampleData,
        timestamp: fromStartOfByResolution,
      });
    } else {
      result.push(dataByKey[fromStartOfByResolution]);
    }
    fromStartOfByResolution = fromStartOfByResolution + convertedResolution;
  }

  return result;
};
