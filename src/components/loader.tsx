import React from 'react';
import { Html, useProgress } from '@react-three/drei';
import { CircularProgress } from '@mui/material';

type LoaderProps = {
  color?: string;
};

type DefaultValues = {
  color: string;
};

export function Loader(props: LoaderProps) {
  const defaultValues: DefaultValues = {
    color: 'black',
  };

  const { progress } = useProgress();

  return (
    <Html center>
      <CircularProgress
        style={{ color: props.color ?? defaultValues.color }}
        variant="determinate"
        value={progress}
      />
    </Html>
  );
}
