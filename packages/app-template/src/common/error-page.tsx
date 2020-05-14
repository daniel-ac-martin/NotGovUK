import React from 'react';
import { ErrorPageProps } from '@not-govuk/client-renderer';

export const ErrorPage: React.ComponentType<ErrorPageProps> = ({ internal, title, message}) => (
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
