import React from 'react';
import ReactDOM from 'react-dom';
import { Canvas } from '@react-three/fiber';

import { Model } from './model';

export interface CaroumeshProps {
  width?: number;
  height?: number;
  backgroundColor?: any;
}

export function Caroumesh(props: CaroumeshProps) {
  return (
    <Canvas
      style={{
        width: props.width ? props.width : '100%',
        height: props.height ? props.height : '100%',
      }}
    >
      <ambientLight intensity={0.1} />
      <directionalLight color="white" position={[0, 0, 5]} />

      {props.backgroundColor ? (
        <color attach="background" args={props.backgroundColor} />
      ) : null}
      <Model position={[-1.2, 0, 0]} />
      <Model position={[1.2, 0, 0]} />
    </Canvas>
  );
}

const rootElement = document.getElementById('root');
ReactDOM.render(<Caroumesh />, rootElement);
