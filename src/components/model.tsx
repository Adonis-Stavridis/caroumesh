import React, { useLayoutEffect, useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { PointLight } from 'three';

type ModelProps = JSX.IntrinsicElements['group'] & {
  src: string;
};

export function Model(props: ModelProps) {
  const ref = useRef<THREE.Group>();
  const { scene } = useGLTF(props.src);

  useFrame(() => {
    if (ref.current !== undefined) {
      ref.current.rotation.y += 0.003;
    }
  });

  useLayoutEffect(() => {
    scene.traverse((obj) => {
      obj.type === 'Mesh' && (obj.receiveShadow = obj.castShadow = true);
      if (obj.type === 'PointLight' && props.scale) {
        (obj as PointLight).distance *= props.scale as number;
      }
    });
  }, [scene]);

  return <primitive ref={ref} object={scene} {...props} />;
}
