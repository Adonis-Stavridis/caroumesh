import { useLoader } from '@react-three/fiber';
import { Object3D } from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';

import { isFileGLTF, isFileGroup } from 'src/lib/types';
import { CaroumeshError } from 'src/lib/utils';

import { LoadedScene } from './Scene.types';

export const useSceneLoader = (src: string): LoadedScene => {
  const loader = matchLoaderFromFileExtension(src);
  const file = useLoader(loader, src);

  if (isFileGLTF(file)) {
    return file.scene;
  }

  if (isFileGroup(file)) {
    return file;
  }

  throw new CaroumeshError('Scene', `Could not find any scenes inside ${src}`);
};

export const matchLoaderFromFileExtension = (
  src: string,
): typeof GLTFLoader | typeof OBJLoader | typeof FBXLoader | never => {
  const extension = src.split('.').pop();
  switch (extension) {
    case 'gltf':
      return GLTFLoader;
    case 'obj':
      return OBJLoader;
    case 'fbx':
      return FBXLoader;
  }

  throw new CaroumeshError(
    'Scene',
    `Filename ${src} is not supported: please provide a filename using the path/filename.(gltf|obj|fbx) format`,
  );
};

export const getSceneObject = (scene: LoadedScene, obj: Object3D) =>
  scene.getObjectById(obj.id) ?? scene.getObjectByName(obj.name);
