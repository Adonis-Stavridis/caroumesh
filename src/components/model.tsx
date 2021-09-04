import React, { useLayoutEffect, useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { PointLight, SpotLight } from 'three';

type ModelProps = JSX.IntrinsicElements['group'] & {
  src: string;
};

export function Model(props: ModelProps) {
  const { scene } = useGLTF(props.src);
  const ref = useRef<THREE.Group>(scene);

  useFrame(() => {
    if (ref.current !== undefined) {
      ref.current.rotation.y += 0.003;
    }
  });

  useLayoutEffect(() => {
    scene.traverse((obj) => {
      obj.type === 'Mesh' && (obj.receiveShadow = obj.castShadow = true);
      if (props.scale) {
        obj.type === 'PointLight' &&
          ((obj as PointLight).distance *= props.scale as number);
        obj.type === 'SpotLight' &&
          ((obj as SpotLight).distance *= props.scale as number);
      }
    });
  }, [scene]);

  return <primitive ref={ref} object={scene} {...props} />;
}
