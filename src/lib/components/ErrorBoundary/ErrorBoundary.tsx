import { compact, isString } from 'lodash';
import queryString from 'query-string';
import React from 'react';
import { Alert } from 'react-bootstrap';
import { ExclamationCircleFill, Github } from 'react-bootstrap-icons';
import type { FallbackProps } from 'react-error-boundary';
import { ErrorBoundary as ErrorBoundaryComponent } from 'react-error-boundary';

import './ErrorBoundary.scss';

const CN = 'error-boundary';

const GITHUB_ISSUES_URL =
  'https://github.com/Adonis-Stavridis/caroumesh/issues/new';
const DEV_ENV = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

type ErrorBoundaryProps = {
  children: React.ReactNode;
};

export const ErrorBoundary = ({ children }: ErrorBoundaryProps) => (
  <ErrorBoundaryComponent
    FallbackComponent={({ error }: FallbackProps) => (
      <Alert variant="danger">
        <Alert.Heading className={`${CN}-spaced`}>
          <ExclamationCircleFill />
          An error occurred
        </Alert.Heading>
        <div className={`${CN}-content`}>
          <div className={`${CN}-section`}>
            <strong>Description</strong>
            <span>{error.message}</span>
          </div>
          <>
            {isString(error.cause) && (
              <div className={`${CN}-section`}>
                <strong>Cause</strong>
                <span>{error.cause}</span>
              </div>
            )}
            {DEV_ENV && (
              <details>
                <summary>Stack trace</summary>
                <div className={`${CN}-stack`}>
                  {compact(error.stack?.split('\n')).map((filename, index) =>
                    isString(filename) ? (
                      <li key={`${filename}-${index}`}>{filename}</li>
                    ) : null,
                  )}
                </div>
              </details>
            )}
          </>
        </div>
        {DEV_ENV && (
          <>
            <hr />
            <div className={`${CN}-spaced`}>
              <Github />
              <span>
                Address this error by{' '}
                <a
                  className="alert-link"
                  href={createGithubIssuesUrl(error)}
                  target="_blank"
                  rel="noreferrer"
                >
                  creating an issue on Github
                </a>
                !
              </span>
            </div>
          </>
        )}
      </Alert>
    )}
  >
    {children}
  </ErrorBoundaryComponent>
);

const createGithubIssuesUrl = (error: Error) =>
  queryString.stringifyUrl({
    url: GITHUB_ISSUES_URL,
    query: {
      title: 'Error caught by boundary',
      body: `## Error message\n\n\`${error.message}\`${
        error.stack
          ? `\n\n## Stack trace\n\n\`\`\`\n${error.stack}\`\`\`\n`
          : ''
      }${isString(error.cause) ? `\n\n## Cause\n\n${error.cause}` : ''}`,
    },
  });
