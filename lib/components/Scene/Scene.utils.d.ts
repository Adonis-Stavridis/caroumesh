import { Object3D } from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { LoadedScene } from './Scene.types';
export declare const useSceneLoader: (src: string) => LoadedScene;
export declare const matchLoaderFromFileExtension: (src: string) => typeof GLTFLoader | typeof OBJLoader | typeof FBXLoader | never;
export declare const getSceneObject: (scene: LoadedScene, obj: Object3D) => Object3D<import("three").Event> | undefined;
//# sourceMappingURL=Scene.utils.d.ts.map