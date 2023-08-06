import type { SceneProps } from '@react-three/fiber';
import type { PointLight, SpotLight } from 'three';
import { Object3D } from 'three';
import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';

export const isSceneProps = (sceneProps: unknown): sceneProps is SceneProps =>
  typeof sceneProps === 'object' && sceneProps !== null && 'src' in sceneProps;

export const isFileGLTF = (file: unknown): file is GLTF =>
  typeof file === 'object' && file !== null && 'scene' in file;

export const isFileGroup = (file: unknown): file is GLTF =>
  typeof file === 'object' && file !== null && 'parent' in file;

const isObjPointLight = (obj: unknown): obj is PointLight =>
  obj instanceof Object3D && obj.type === 'PointLight';

const isObjSpotLight = (obj: unknown): obj is SpotLight =>
  obj instanceof Object3D && obj.type === 'SpotLight';

export const isObjLight = (obj: unknown): obj is PointLight | SpotLight =>
  isObjPointLight(obj) ?? isObjSpotLight(obj);

export const isNumberTuple = (tuple: unknown): tuple is [number, number] =>
  Array.isArray(tuple) &&
  tuple.length === 2 &&
  typeof tuple[0] === 'number' &&
  typeof tuple[1] === 'number';
