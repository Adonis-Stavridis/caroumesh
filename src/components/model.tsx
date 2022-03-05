import React, { useLayoutEffect, useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame, Vector3 } from '@react-three/fiber';
import { PointLight, SpotLight } from 'three';

type ModelProps = JSX.IntrinsicElements['group'] & {
  src: string;
  shadows?: boolean;
  offset?: Vector3;
};

type DefaultValues = {
  rotationSpeed: number;
};

export function Model(props: ModelProps) {
  const defaultValues: DefaultValues = {
    rotationSpeed: 0.1
  };

  const { scene } = useGLTF(props.src);
  const ref = useRef<THREE.Group>(scene);

  useFrame((_state, delta) => {
    ref.current.rotation.y += delta * defaultValues.rotationSpeed;
  });

  useLayoutEffect(() => {
    scene.traverse((obj) => {
      obj.type === 'Mesh' &&
        (obj.receiveShadow = obj.castShadow = props.shadows ?? false);

      if (props.scale) {
        obj.type === 'PointLight' &&
          ((obj as PointLight).distance *= props.scale as number);
        obj.type === 'SpotLight' &&
          ((obj as SpotLight).distance *= props.scale as number);
      }
    });
  }, [scene, props.shadows, props.scale]);

  return <primitive ref={ref} object={scene} {...props} />;
}
