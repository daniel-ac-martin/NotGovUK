import React from 'react';
import { ErrorPage as TErrorPage } from '@not-govuk/app-composer';

export const ErrorPage: TErrorPage = ({ internal, title, message }) => (
  internal
  ? (
    <>
    <h1>Something went wrong...</h1>
    <h2>{title}</h2>
    <p>{message}</p>
    </>
  )
  : (
    <>
    <h1 className="govuk-heading-l">{title}</h1>
    <p>{message}</p>
    </>
  )
);

export default ErrorPage;
