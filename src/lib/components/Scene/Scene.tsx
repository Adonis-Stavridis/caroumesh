import { Circle } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { isNumber } from 'lodash';
import React from 'react';
import { Euler, Vector3 } from 'three';

import { Object3DProps } from './Scene.types';
import { getSceneObject, useSceneLoader } from './Scene.utils';
import { MAIN_COLOR } from '../../styles';
import { isObjLight } from '../../types';
import type { EmptyProps, OptionalProps } from '../../types';
import { CaroumeshError } from '../../utils';

export type SceneProps<T = EmptyProps> = {
  /** Source path to scene file */
  src: string;
  /** Cast and receive shadows */
  shadows?: boolean;
  /** Control intensity of lights in scene */
  lightIntensity?: number;
  /** Rotation speed of scene: set to `0` to disable rotation */
  rotationSpeed?: number;
} & Object3DProps & {
    /** Extra props defined in the three.js docs */
    extraProps?: T;
  };

const DEFAULTS: OptionalProps<SceneProps, keyof Object3DProps> = {
  shadows: false,
  lightIntensity: 1,
  rotationSpeed: 0.1,
  extraProps: {},
};

export const Scene = <T extends Record<string, unknown> = EmptyProps>({
  src,
  shadows = DEFAULTS.shadows,
  lightIntensity = DEFAULTS.lightIntensity,
  rotationSpeed = DEFAULTS.rotationSpeed,
  position,
  up,
  scale,
  rotation,
  matrix,
  quaternion,
  extraProps,
}: SceneProps<T>) => {
  const scene = useSceneLoader(src);

  const sceneCopy = React.useMemo(() => scene.clone(true), [scene]);
  const sceneRef = React.useRef(sceneCopy);

  React.useLayoutEffect(() => {
    const scaleFactor = isNumber(scale) ? scale : scale?.length() ?? 1;
    sceneCopy.traverse((obj) => {
      obj.type === 'Mesh' && (obj.receiveShadow = obj.castShadow = shadows);

      if (scale && isObjLight(obj)) {
        const originalObj = getSceneObject(sceneCopy, obj);
        if (isObjLight(originalObj)) {
          obj.distance = originalObj.distance * scaleFactor;
          obj.intensity = originalObj.intensity * lightIntensity;
        } else {
          throw new CaroumeshError(
            'Scene',
            `Could not scale scene lights properly for the following file: ${src}`,
          );
        }
      }
    });
  }, [sceneCopy, src, shadows, scale, lightIntensity]);

  useFrame((_state, delta) => {
    sceneRef.current.rotation.y += delta * rotationSpeed;
  });

  return (
    <>
      <primitive
        ref={sceneRef}
        object={sceneCopy}
        position={position}
        up={up}
        scale={scale}
        rotation={rotation}
        matrix={matrix}
        quaternion={quaternion}
        {...extraProps}
      />
      <CircleShadow position={position} />
    </>
  );
};

type CircleShadowProps<T extends Record<string, unknown> = EmptyProps> = {
  position?: Vector3;
} & T;

const CircleShadow = <T extends Record<string, unknown> = EmptyProps>({
  position = new Vector3(0, 0, 0),
  ...props
}: CircleShadowProps<T>) => {
  return (
    <Circle
      args={[0.5, 50]}
      position={new Vector3(position.x, -1, position.z)}
      rotation={new Euler(-Math.PI / 2, 0, 0)}
      {...props}
    >
      <meshBasicMaterial color={MAIN_COLOR} />
    </Circle>
  );
};
