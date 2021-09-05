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
  distance?: number;
};

type DefaultValues = {
  distance: number;
  yPosition: number;
  width: string;
  height: string;
};

export function Caroumesh(props: CaroumeshProps) {
  const [models, setModels] = useState<JSX.Element | JSX.Element[] | undefined>(
    props.children
  );

  const defaultValues: DefaultValues = {
    distance: 10,
    yPosition: 0,
    width: '100%',
    height: '100%',
  };

  useEffect(() => {
    const distance = props.distance ?? defaultValues.distance;

    if (models === undefined) return;

    var newObjects: JSX.Element[] = [];

    if (!Array.isArray(models)) {
      newObjects.push(models);
    } else {
      models.forEach((element, index) => {
        if (element.type === Model) {
          var oldPosition = element.props.position || new Vector3();
          var newPosition = new Vector3(
            distance *
              Math.sin(((2 * Math.PI) / models.length) * index + Math.PI),
            defaultValues.yPosition,
            distance *
              Math.cos(((2 * Math.PI) / models.length) * index + Math.PI) +
              distance
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
        width: props.width ? props.width : defaultValues.width,
        height: props.height ? props.height : defaultValues.height,
      }}
      shadows
      camera={{ fov: 45, position: [0, 0.5, 5] }}
    >
      {props.backgroundColor && (
        <color attach="background" args={props.backgroundColor} />
      )}
      <Suspense fallback={<Loader />}>
        <pointLight
          color="white"
          intensity={1}
          position={[8, 8, 8]}
          castShadow
          shadowBias={-0.0005}
          shadowMapWidth={2048}
          shadowMapHeight={2048}
        />
        <pointLight color="white" intensity={0.3} position={[-8, 0, 8]} />
        <pointLight
          color="white"
          intensity={2}
          distance={15}
          position={[0, 0, -8]}
        />
        {models}
      </Suspense>

      {props.effects && <Effects />}
      {props.stats && <Stats />}
    </Canvas>
  );
}
