import React from 'react';
import { Html, useProgress } from '@react-three/drei';
import { CircularProgress } from '@mui/material';

export function Loader() {
  const { progress } = useProgress();

  return (
    <Html center>
      <CircularProgress
        style={{ color: 'gold' }}
        variant="determinate"
        value={progress}
      />
    </Html>
  );
}
