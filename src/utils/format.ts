import BigNumber from 'bignumber.js';
import moment from 'moment';
import { NOT_AVAILABLE_TEXT, TO_BE_ANNOUCED_TEXT, SI } from './constants';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const commaNumber = require('comma-number');

// Almost never return exponential notation:
BigNumber.config({ EXPONENTIAL_AT: 1e9 });

export const getDecimalPlaces = (decimals: number) => {
  return decimals > 8 ? 8 : decimals;
};

export const roundNumberWithBase = (n: number, base: number): number => {
  return Math.floor(n / base) * base;
};

export const formatCommaNumber = (number: number | string | BigNumber) => {
  return BigNumber(number).toFormat().toString();
};

export const roundNumber = (
  number: number | string | BigNumber,
  roundMode = BigNumber.ROUND_DOWN,
  decimals = 18,
) => {
  const newNumber = new BigNumber(number).toFixed(
    getDecimalPlaces(decimals),
    roundMode,
  );
  return new BigNumber(newNumber).toString();
};

export const formatTickerNumber = (
  number: number | string | undefined | BigNumber,
  precision: number | undefined,
) => {
  if (!number) {
    return '--';
  }
  return new BigNumber(number)
    .toFixed(precision || 0, 1)
    .toString()
    .replace(/\d(?=(\d{3})+\.)/g, '$&,');
};

export const formatTimestamp = (
  timestamp: number,
  format = 'DD/MM/YYYY HH:mm:ss',
  isUtc = false,
): string => {
  if (!timestamp) {
    return TO_BE_ANNOUCED_TEXT;
  }
  const result = moment(timestamp);
  if (isUtc) {
    return result.utc().format(format);
  }
  return result.format(format);
};

export const formatShortAddress = (
  address: string,
  digits = 6,
  digitsAfter = 3,
): string => {
  if (!address) {
    return NOT_AVAILABLE_TEXT;
  }
  return `${address.substring(0, digits)}...${address.substring(
    address.length - digitsAfter,
    address.length,
  )}`;
};

export const convertWeiToDec = (
  weiNumber: string | BigNumber,
  decimals = 18,
): string => {
  const number = new BigNumber(weiNumber || 0).div(
    new BigNumber(10).exponentiatedBy(decimals),
  );
  return new BigNumber(number).toString();
};

export const convertDecToWei = (number: string, decimals = 18): string => {
  return new BigNumber(number || 0)
    .multipliedBy(new BigNumber(10).exponentiatedBy(decimals))
    .toString();
};

const _formatLargeNumberIfNeed = (number: string, digits = 0) => {
  if (new BigNumber(number).comparedTo(1000000) < 0) {
    return commaNumber(
      new BigNumber(Number(number).toFixed(digits)).toString(),
      ',',
      '.',
    );
  }
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  const num = parseFloat(number);
  let i;
  for (i = SI.length - 1; i > 0; i--) {
    if (num >= SI[i].value) {
      break;
    }
  }
  return (
    BigNumber(num / SI[i].value)
      .toFixed(digits, BigNumber.ROUND_DOWN)
      .toString()
      .replace(rx, '$1') + SI[i].symbol
  );
};

export function formatWeiNumber(
  value: string | BigNumber,
  decimals = 18,
  precision = 8,
): string {
  if (
    !value ||
    new BigNumber(value || 0).isZero() ||
    new BigNumber(value).isNegative()
  ) {
    return NOT_AVAILABLE_TEXT;
  }

  const decimalPlaces = decimals > precision ? precision : decimals;
  const valueAsString = new BigNumber(value).toString();
  const newValue = new BigNumber(
    convertWeiToDec(valueAsString, decimals),
  ).toFixed(decimalPlaces, BigNumber.ROUND_DOWN);

  return _formatLargeNumberIfNeed(
    new BigNumber(newValue).toString(),
    decimalPlaces,
  );
}

export function formatNumber(
  value: string | number | BigNumber,
  decimalPlaces = 4,
): string {
  if (!value || new BigNumber(value || 0).isZero()) {
    return NOT_AVAILABLE_TEXT;
  }

  if (
    new BigNumber(value).isGreaterThan(0) &&
    new BigNumber(value).isLessThan(0.00000001)
  ) {
    return '<0.00000001';
  }

  return _formatLargeNumberIfNeed(
    roundNumber(value, BigNumber.ROUND_DOWN),
    decimalPlaces,
  );
}

export function formatNumberWithZero(
  value: string | number | BigNumber,
  decimalPlaces = 4,
  decimalFixed = 2,
): string {
  const numberValue = new BigNumber(value);
  if (!value || numberValue.isZero()) {
    return '0';
  }

  if (numberValue.comparedTo(1_000_000) < 0) {
    return new BigNumber(
      new BigNumber(value).decimalPlaces(2).toFixed(2),
    ).toFormat(decimalFixed);
  }

  return formatNumber(value, decimalPlaces);
}

export function formatToPercent(
  number: string | number | BigNumber,
  decimalPlaces = 2,
): string {
  const newValue = new BigNumber(number)
    .multipliedBy(100)
    .toFixed(decimalPlaces);
  return new BigNumber(newValue).toString() + '%';
}
