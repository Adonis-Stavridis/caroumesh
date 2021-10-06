import { Alert, AlertTitle, Button } from '@mui/material';
import React, { ReactNode } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

type FallbackProps = {
  error: Error;
  resetErrorBoundary: (...args: Array<unknown>) => void;
};

function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <Alert severity="error">
      <AlertTitle>
        <strong>Caroumesh - Error</strong>
      </AlertTitle>

      <strong>Description</strong>
      <pre>{error.message}</pre>

      <strong>Call stack</strong>
      <pre>{error.stack}</pre>

      <Button variant="contained" color="primary" onClick={resetErrorBoundary}>
        Retry
      </Button>
    </Alert>
  );
}

type CaroumeshContainerProps = {
  children: ReactNode;
};

export function CaroumeshContainer(props: CaroumeshContainerProps) {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      {props.children}
    </ErrorBoundary>
  );
}
