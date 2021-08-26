// import React, { useLayoutEffect } from 'react';
// import { useGLTF } from '@react-three/drei';

// export interface ModelProps {
//   src: string;
// }

// export function Model(props: ModelProps) {
//   const { scene } = useGLTF(props.src);

//   useLayoutEffect(() => {
//     scene.traverse(
//       (obj) =>
//         obj.type === 'Mesh' && (obj.receiveShadow = obj.castShadow = true)
//     );
//   }, [scene]);

//   return <primitive object={scene} {...props} />;
// }

import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function Model(props: any) {
  const ref = useRef<THREE.Mesh>();
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);

  useFrame(() => {
    if (ref.current !== undefined) {
      ref.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh
      {...props}
      ref={ref}
      scale={active ? 1.5 : 1}
      onClick={() => setActive(!active)}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'tomato' : 'gold'} />
    </mesh>
  );
}