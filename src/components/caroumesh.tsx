import React, { CSSProperties, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Html, Stage, useProgress } from '@react-three/drei';
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
      camera={{ fov: 45 }}
    >
      {props.backgroundColor ? (
        <color attach="background" args={props.backgroundColor} />
      ) : null}
      <Suspense fallback={<Loader />}>
        <Stage
          castShadow
          shadowBias={-0.0005}
          contactShadow
          contactShadowBlur={0.1}
          contactShadowOpacity={0.1}
        >
          {props.children}
        </Stage>
      </Suspense>
    </Canvas>
  );
}
