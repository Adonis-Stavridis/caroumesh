import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import { Mesh } from 'three';

type ModelProps = JSX.IntrinsicElements['group'] & {
  src: string;
};

type GLTFResult = GLTF;

export function Model(props: ModelProps) {
  const group = useRef<THREE.Group>();
  const model = useGLTF(props.src) as GLTFResult;

  let node = model.scenes[0].children[0] as Mesh;

  return (
    <group ref={group} {...props} dispose={null}>
      <mesh
        geometry={node.geometry}
        material={node.material}
      />
    </group>
  );
}
