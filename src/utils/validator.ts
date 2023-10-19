import { BigNumber } from 'bignumber.js';
import SimpleReactValidator from 'simple-react-validator';
import { formatNumber } from 'src/utils/format';

type IRule =
  | 'accepted'
  | 'after'
  | 'after_or_equal'
  | 'alpha'
  | 'alpha_space'
  | 'alpha_num'
  | ' alpha_num_space'
  | 'alpha_num_dash'
  | 'alpha_num_dash_space'
  | 'array'
  | 'before'
  | 'before_or_equal'
  | 'between'
  | 'boolean'
  | 'card_exp'
  | 'card_num'
  | 'currency'
  | 'date'
  | 'date_equals'
  | 'email'
  | 'in'
  | 'integer'
  | 'max'
  | 'min'
  | 'not_in'
  | 'not_regex'
  | 'numeric'
  | 'phone'
  | 'regex'
  | 'required'
  | 'size'
  | 'string'
  | 'typeof'
  | 'url';

type CustomRule =
  | 'logoUrl'
  | 'videoUrl'
  | 'minValue'
  | 'maxValue'
  | 'isPositive'
  | 'maxDigits'
  | 'isSame'
  | 'isAddress'
  | 'maxCountIds'
  | 'isIds';

export type Rules = IRule | CustomRule;

interface IRules {
  [key: Rules | string]: {
    message: string;
    rule: (val: string, params?: string) => boolean;
  };
}

interface IOptions {
  validators?: IRules;
  messages?: any;
  className?: string;
  element?: (message: string) => string | JSX.Element;
  locale?: string;
}

export const createValidator = (options?: IOptions | undefined) => {
  let defaultOptions = {
    validators: {
      logoUrl: {
        message: 'The logo must end in “jpeg”, “jpg” or “png”',
        rule: (val: string): boolean => /^.+\.(jpeg|jpg|png)$/.test(val),
      },
      videoUrl: {
        message: 'The video must end in “mp4”, “wmv”, “mov”, “avi” or “webm”',
        rule: (val: string): boolean =>
          /^.+\.(mp4|wmv|mov|avi|webm)$/.test(val),
      },
    },
  };
  if (options) {
    const { validators, ...others } = options;
    defaultOptions = {
      ...defaultOptions,
      validators: {
        ...defaultOptions.validators,
        ...validators,
      },
      ...others,
    };
  }

  return new SimpleReactValidator(defaultOptions);
};
