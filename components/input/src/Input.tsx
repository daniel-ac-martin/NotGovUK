import { FC, Fragment, InputHTMLAttributes, createElement as h } from 'react';
import { StandardProps, classBuilder } from '@not-govuk/component-helpers';

import '../assets/Input.scss';

export type InputProps = StandardProps & InputHTMLAttributes<HTMLInputElement> & {
  /** Prefix to show before the field */
  prefix?: string
  /** Suffix to show after the field */
  suffix?: string
  /** Width of the field in characters (approximate) */
  width?: number
};

export const Input: FC<InputProps> = ({
  classBlock,
  classModifiers,
  className,
  prefix,
  suffix,
  type = 'text',
  width,
  ...attrs
}) => {
  const classes = classBuilder('govuk-input', classBlock, classModifiers, className);
  const maxWidth = width === undefined ? undefined : (
    (((width >= 10) ? 4.76 : 1.76) + 1.81 * width) + 'ex'
  );
  const style = !maxWidth ? undefined : {
    maxWidth
  };
  const useWrapper = !!(prefix || suffix);
  const input = (
    <input
      {...attrs}
      className={classes()}
      style={style}
      type={type}
    />
  );

  return (
    <Fragment>
    { useWrapper ? (
        <div className={classes('wrapper')}>
          { !prefix ? null : (
              <div className={classes('prefix')} aria-hidden="true">
                {prefix}
              </div>
          ) }
          {input}
          { !suffix ? null : (
              <div className={classes('suffix')} aria-hidden="true">
                {suffix}
              </div>
          ) }
        </div>
      ) : (
        <Fragment>
          {input}
        </Fragment>
    ) }
    </Fragment>
  );
};

Input.displayName = 'Input';

export default Input;
