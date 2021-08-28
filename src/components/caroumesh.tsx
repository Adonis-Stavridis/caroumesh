import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Html, OrbitControls, Stage, useProgress } from '@react-three/drei';

import { Destroyer } from './destroyer';

type CaroumeshProps = {
  width?: number;
  height?: number;
  backgroundColor?: any;
  src?: string;
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
          <Destroyer />
        </Stage>
      </Suspense>

      <OrbitControls
        autoRotate
        enableZoom={true}
        enablePan={false}
        minPolarAngle={Math.PI / 2.8}
        maxPolarAngle={Math.PI / 1.6}
      />
    </Canvas>
  );
}
