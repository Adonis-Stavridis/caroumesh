// import React, { Suspense } from 'react';
// import { Canvas } from '@react-three/fiber';
// import { Environment, OrbitControls, Stage } from '@react-three/drei';

import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

import { Model } from './model';

export interface CaroumeshProps {
  width?: number;
  height?: number;
  backgroundColor?: any;
  // src: string;
}

export function Caroumesh(props: CaroumeshProps) {
  return (
    <Canvas
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
      <fog attach="fog" args={['#101010', 10, 50]} />

      {/* <Suspense fallback={null}>
        <Environment path="/cube" />
        <Stage intensity={1} contactShadowOpacity={1} shadowBias={-0.0015}>
          <Model src={props.src} />
        </Stage>
      </Suspense>

      <mesh rotation-x={-Math.PI / 2} scale={100}>
        <planeGeometry />
        <meshStandardMaterial color="#101010" transparent depthWrite={false} />
      </mesh> */}
      <Model />

      <OrbitControls
        autoRotate
        enableZoom={false}
        enablePan={false}
        minPolarAngle={Math.PI / 2.8}
        maxPolarAngle={Math.PI / 2.8}
      />
    </Canvas>
  );
}
