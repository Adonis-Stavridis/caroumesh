import { Html, useProgress } from '@react-three/drei';
import React from 'react';
import { Spinner } from 'react-bootstrap';

import './ProgressLoader.scss';

const CN = 'progress-loader';

const TIMEOUT_TIME = 5000;

export const ProgressLoader = () => {
  const [displayMessage, setDisplayMessage] = React.useState(false);
  const { progress } = useProgress();

  React.useEffect(() => {
    const timer = setTimeout(() => setDisplayMessage(true), TIMEOUT_TIME);
    return () => clearTimeout(timer);
  }, []);

  const message = React.useMemo(
    () =>
      progress < 30
        ? 'This is taking more time than expected...'
        : progress < 60
        ? 'Ahhh progress'
        : progress < 90
        ? 'Almost there...'
        : 'Finalizing!',
    [progress],
  );

  return (
    <Html className={`${CN}`} fullscreen>
      <Spinner />
      <span className={`${CN}-text`}>
        {!displayMessage ? 'Loading models' : message}
      </span>
    </Html>
  );
};
