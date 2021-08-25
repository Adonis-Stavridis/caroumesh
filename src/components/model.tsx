import React, { useLayoutEffect } from 'react';
import { useGLTF } from '@react-three/drei';

export interface ModelProps {
  src: string;
}

export function Model(props: ModelProps) {
  const { scene } = useGLTF(props.src);

  useLayoutEffect(() => {
    scene.traverse(
      (obj) =>
        obj.type === 'Mesh' && (obj.receiveShadow = obj.castShadow = true)
    );
  }, [scene]);

  return <primitive object={scene} {...props} />;
}
