import { FC, Fragment, createElement as h } from 'react';
import { classBuilder } from '@not-govuk/component-helpers';
import { StandaloneInput, StandaloneInputProps } from '@not-govuk/standalone-input';

import '../assets/SearchBox.scss';

export type SearchBoxProps = StandaloneInputProps & {
};

export const SearchBox: FC<SearchBoxProps> = ({
  button: _button = 'Search',
  classBlock,
  classModifiers,
  className,
  label = 'Search',
  name = 'q',
  ...props
}) => {
  const classes = classBuilder('not-govuk-search-box', classBlock, classModifiers, className);
  const button = (
    <Fragment>
      {_button}
      <svg className={classes('icon')} width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
        <circle cx="12.0161" cy="11.0161" r="8.51613" stroke="currentColor" strokeWidth="3"></circle>
        <line x1="17.8668" y1="17.3587" x2="26.4475" y2="25.9393" stroke="currentColor" strokeWidth="3"></line>
      </svg>
    </Fragment>
  );

  return (
    <StandaloneInput {...props} className={classes()} label={label} name={name} button={button} />
  );
};

SearchBox.displayName = 'SearchBox';

export default SearchBox;
