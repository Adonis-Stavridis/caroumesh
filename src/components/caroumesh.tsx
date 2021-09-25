import React, {
  cloneElement,
  CSSProperties,
  Suspense,
  useEffect,
  useState,
} from 'react';
import { Canvas } from '@react-three/fiber';
import { Color, Vector3 } from 'three';

import { Effects } from './effects';
import { Loader } from './loader';
import { Model } from './model';
import { Stats } from '@react-three/drei';

import { ChevronLeft, ChevronRight } from 'react-bootstrap-icons';

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
  const defaultValues: DefaultValues = {
    distance: 10,
    yPosition: 0,
    width: '100%',
    height: '100%',
  };

  const [models, setModels] = useState<JSX.Element[]>();

  const renderModels = (
    elements: JSX.Element | JSX.Element[] | undefined = models
  ) => {
    const distance = props.distance ?? defaultValues.distance;

    if (elements === undefined) return;

    var newObjects: JSX.Element[] = [];

    if (!Array.isArray(elements)) {
      newObjects.push(elements);
    } else {
      elements.forEach((element, index) => {
        if (element.type === Model) {
          // var oldPosition = element.props.position ?? new Vector3();
          var newPosition = new Vector3(
            distance *
              Math.sin(((2 * Math.PI) / elements.length) * index + Math.PI),
            defaultValues.yPosition,
            distance *
              Math.cos(((2 * Math.PI) / elements.length) * index + Math.PI) +
              distance
          );
          // newPosition.add(oldPosition);
          newObjects.push(
            cloneElement(element, {
              key: index,
              position: newPosition,
              ...element.props,
            })
          );
        } else console.log('Caroumesh only accepts <Model/> components.');
      });
    }

    setModels(newObjects);
    console.log(models);
  };

  const rotateRight = () => {
    if (models && models.length > 1) {
      let last = models.pop();
      last && models.unshift(last);
      renderModels();
    }
  };

  const rotateLeft = () => {
    if (models && models.length > 1) {
      let first = models.shift();
      first && models.push(first);
      renderModels();
    }
  };

  useEffect(() => {
    renderModels(props.children);
  }, [props.children]);

  return (
    <div
      style={{
        ...props.style,
        width: props.width ?? defaultValues.width,
        height: props.height ?? defaultValues.height,
        position: 'relative',
      }}
    >
      {models && models.length > 1 && (
        <div style={{ zIndex: 10, position: 'absolute' }}>
          <div onClick={rotateLeft}>
            <ChevronLeft color="white" />
          </div>
          <div onClick={rotateRight}>
            <ChevronRight color="white" />
          </div>
        </div>
      )}
      <Canvas
        {...props}
        shadows
        camera={{ fov: 45, position: [0, 0.5, 5] }}
        style={{
          position: 'absolute',
        }}
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
            shadowBias={-0.00008}
            shadowMapWidth={2048}
            shadowMapHeight={2048}
          />
          <pointLight color="white" intensity={0.3} position={[-8, 0, 8]} />
          {models}
        </Suspense>

        {props.effects && <Effects />}
        {props.stats && <Stats />}
      </Canvas>
    </div>
  );
}
