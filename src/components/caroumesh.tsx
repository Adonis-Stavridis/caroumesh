import React, { CSSProperties, Suspense, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Color, Vector3 } from 'three';

import { Effects } from './effects';
import { Loader } from './loader';
import { Model } from './model';
import { Stats } from '@react-three/drei';

type CaroumeshProps = {
  width?: number;
  height?: number;
  backgroundColor?: [Color] | [number, number, number];
  style?: CSSProperties;
  children?: JSX.Element[];
  effects?: boolean;
  stats?: boolean;
};

export function Caroumesh(props: CaroumeshProps) {
  const [models, setModels] = useState<JSX.Element | JSX.Element[] | undefined>(
    props.children
  );

  useEffect(() => {
    if (models === undefined) return;

    var newObjects: JSX.Element[] = [];

    if (!Array.isArray(models)) {
      newObjects.push(models);
    } else {
      models.forEach((element, index) => {
        if (element.type === Model) {
          var oldPosition = element.props.position
            ? element.props.position
            : new Vector3();
          var newPosition = new Vector3(
            5 * Math.sin(((2 * Math.PI) / models.length) * index),
            0,
            5 * Math.cos(((2 * Math.PI) / models.length) * index)
          );
          newPosition.add(oldPosition);
          newObjects.push(
            <Model key={index} position={newPosition} {...element.props} />
          );
        } else console.log('Caroumesh only accepts <Model/> components.');
      });
    }

    setModels(newObjects);
  }, [props.children]);

  return (
    <Canvas
      {...props}
      style={{
        ...props.style,
        width: props.width ? props.width : '100%',
        height: props.height ? props.height : '100%',
      }}
      shadows
      camera={{ fov: 45, position: [0, 0.5, 10] }}
    >
      {props.backgroundColor ? (
        <color attach="background" args={props.backgroundColor} />
      ) : null}
      <Suspense fallback={<Loader />}>
        <pointLight
          color="white"
          intensity={1}
          position={[20, 20, 20]}
          castShadow
          shadowBias={-0.0005}
          shadowMapWidth={2048}
          shadowMapHeight={2048}
        />
        <pointLight color="white" intensity={0.3} position={[-20, 0, 20]} />
        <pointLight
          color="white"
          intensity={2}
          distance={15}
          position={[0, 0, 0]}
        />
        {models}
      </Suspense>

      {props.effects ? <Effects /> : null}
      {props.stats ? <Stats /> : null}
    </Canvas>
  );
}
