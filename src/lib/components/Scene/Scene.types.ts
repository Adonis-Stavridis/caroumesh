import type { Euler, Group, Matrix4, Quaternion, Vector3 } from 'three';
import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';

import type { SceneProps } from './Scene';

/** Scene can be defined by it's filepath `string` or `SceneProps` for more customization */
export type SceneObject = string | SceneProps;

export type LoadedScene = Group | (Group & GLTF);

export type Object3DProps = {
  position?: Vector3;
  up?: Vector3;
  scale?: number | Vector3;
  rotation?: Euler;
  matrix?: Matrix4;
  quaternion?: Quaternion;
};
