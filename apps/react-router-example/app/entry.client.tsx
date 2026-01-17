import { startTransition, StrictMode } from 'react';
import { hydrateRoot } from 'react-dom/client';
import { HydratedRouter } from 'react-router/dom';

startTransition(() => {
  hydrateRoot(
    document,
    <StrictMode>
      <HydratedRouter />
    </StrictMode>,
    {
      // Required because <Links /> is causing a hydration mismatch; I'm not sure why but it seems unrelated to NotGovUK
      onRecoverableError: (error, errorInfo) => {
        console.warn(error, 'Component Stack:', errorInfo.componentStack);
      }
    }
  );
});
