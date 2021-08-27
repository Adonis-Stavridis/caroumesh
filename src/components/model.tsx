import React, { useLayoutEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import { GLTF } from 'three-stdlib';
import { Group } from 'three';

export interface ModelProps {
  src: string;
}

export function Model(props: ModelProps) {
  const loadedModel: GLTF = useGLTF(props.src);
  const scene: Group = loadedModel.scene;

  useLayoutEffect(() => {
    scene.traverse(
      (obj) =>
        obj.type === 'Mesh' && (obj.receiveShadow = obj.castShadow = true)
    );
  }, [scene]);

  return <primitive object={scene} {...props} />;
}
