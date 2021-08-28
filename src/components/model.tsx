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

  console.log(model);

  const renderMesh = (model: GLTFResult) => {
    const items: Array<any> = [];

    for (let scene of model.scenes) {
      for (let child of scene.children) {
        const meshObject = child as Mesh;
        items.push(
          <mesh
            castShadow
            receiveShadow
            key={items.length}
            geometry={meshObject.geometry}
            material={meshObject.material}
          />
        );
      }
    }

    return items;
  };

  return (
    <group ref={group} {...props} dispose={null}>
      {renderMesh(model)}
    </group>
  );
}
