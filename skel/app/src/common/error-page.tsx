import React from 'react';
import { ErrorPage as TErrorPage } from '@not-govuk/app-composer';

export const ErrorPage: TErrorPage = ({ title, message }) => (
  <>
  <h1>{title}</h1>
  <p>{message}</p>
  </>
);

export default ErrorPage;
