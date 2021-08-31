import React, { CSSProperties, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Html, useProgress } from '@react-three/drei';
import { Color } from 'three';
import {
  BrightnessContrast,
  EffectComposer,
  HueSaturation,
  SSAO,
} from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import { CircularProgress } from '@material-ui/core';
import { Model } from './model';

type CaroumeshProps = {
  width?: number;
  height?: number;
  backgroundColor?: [Color] | [number, number, number];
  style?: CSSProperties;
  children?: JSX.Element[];
};

function Loader() {
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

function Effects() {
  return (
    <EffectComposer>
      <SSAO
        blendFunction={BlendFunction.MULTIPLY} // blend mode
        samples={30} // amount of samples per pixel (shouldn't be a multiple of the ring count)
        rings={4} // amount of rings in the occlusion sampling pattern
        distanceThreshold={1.0} // global distance threshold at which the occlusion effect starts to fade out. min: 0, max: 1
        distanceFalloff={0.0} // distance falloff. min: 0, max: 1
        rangeThreshold={0.5} // local occlusion range threshold at which the occlusion starts to fade out. min: 0, max: 1
        rangeFalloff={0.1} // occlusion range falloff. min: 0, max: 1
        luminanceInfluence={0.9} // how much the luminance of the scene influences the ambient occlusion
        radius={20} // occlusion sampling radius
        scale={0.5} // scale of the ambient occlusion
        bias={0.5} // occlusion bias
      />
      <HueSaturation
        blendFunction={BlendFunction.NORMAL} // blend mode
        hue={0} // hue in radians
        saturation={0} // saturation in radians
      />
      <BrightnessContrast
        brightness={0} // brightness. min: -1, max: 1
        contrast={0} // contrast: min -1, max: 1
      />
    </EffectComposer>
  );
}

export function Caroumesh(props: CaroumeshProps) {
  const placeObjectsOnCarousel = (
    objects: JSX.Element | JSX.Element[] | undefined
  ) => {
    if (objects === undefined || !Array.isArray(objects)) return objects;

    var newObjects: JSX.Element[] = [];

    objects.forEach((element, index) => {
      if (element.type === Model) {
        var newPosition = [
          5 * Math.sin(((2 * Math.PI) / objects.length) * index),
          element.props.position ? element.props.position[1] : 0,
          5 * Math.cos(((2 * Math.PI) / objects.length) * index),
        ];
        newObjects.push(
          <Model key={index} position={newPosition} {...element.props} />
        );
      } else newObjects.push(element);
    });

    return newObjects;
  };

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
          shadowMapWidth={1024}
          shadowMapHeight={1024}
        />
        <pointLight color="white" intensity={0.3} position={[-20, 20, 20]} />
        <pointLight color="white" intensity={0.3} position={[20, -20, 20]} />
        <pointLight color="white" intensity={0.3} position={[-20, -20, 20]} />
        {placeObjectsOnCarousel(props.children)}
      </Suspense>

      <Effects />
    </Canvas>
  );
}
