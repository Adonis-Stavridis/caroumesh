import React, { CSSProperties, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Html, useProgress } from '@react-three/drei';
import { Color } from 'three';

type CaroumeshProps = {
  width?: number;
  height?: number;
  backgroundColor?: [Color] | [number, number, number];
  style?: CSSProperties;
  children?: any;
};

function Loader() {
  const { progress } = useProgress();

  return <Html center>{progress}% loaded</Html>;
}

export function Caroumesh(props: CaroumeshProps) {
  return (
    <Canvas
      {...props}
      style={{
        ...props.style,
        width: props.width ? props.width : '100%',
        height: props.height ? props.height : '100%',
      }}
      shadows
      camera={{ fov: 45, position: [0, 5, 75] }}
    >
      {props.backgroundColor ? (
        <color attach="background" args={props.backgroundColor} />
      ) : null}
      <Suspense fallback={<Loader />}>
        <pointLight
          color="white"
          intensity={1}
          position={[50, 50, 50]}
          castShadow
          shadowBias={-0.00075}
          shadowMapWidth={1024}
          shadowMapHeight={1024}
        />
        <pointLight color="white" intensity={0.3} position={[-50, 50, 50]} />
        <pointLight color="white" intensity={0.3} position={[50, -50, 50]} />
        <pointLight color="white" intensity={0.3} position={[-50, -50, 50]} />
        {props.children}
      </Suspense>
    </Canvas>
  );
}
