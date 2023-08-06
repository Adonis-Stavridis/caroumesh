import type { Group } from 'three';
import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';

import type { SceneProps } from './Scene';

/** Scene can be defined by it's filepath `string` or `SceneProps` for more customization */
export type SceneObject = string | SceneProps;

export type LoadedScene = Group | (Group & GLTF);
