import type { SceneProps } from '@react-three/fiber';
import type { PointLight, SpotLight } from 'three';
import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
export declare const isSceneProps: (sceneProps: unknown) => sceneProps is SceneProps;
export declare const isFileGLTF: (file: unknown) => file is GLTF;
export declare const isFileGroup: (file: unknown) => file is GLTF;
export declare const isObjLight: (obj: unknown) => obj is SpotLight | PointLight;
export declare const isNumberTuple: (tuple: unknown) => tuple is [number, number];
//# sourceMappingURL=type-guards.d.ts.map