import { Vector3 } from 'three';

import { BaseLightProps } from './ThreePointLights.types';

export const SHADOW_BIAS = -0.0025;
export const SHADOW_MAP_SIZE = 1024;

export const DEFAULT_KEY_LIGHT: BaseLightProps = {
  intensity: 50,
  position: new Vector3(4, 2, 4),
  angle: 0.5,
  distance: 25,
};

export const DEFAULT_FILL_LIGHT: BaseLightProps = {
  intensity: 10,
  position: new Vector3(-4, 0, 4),
  angle: 0.5,
  distance: 7.5,
};

export const DEFAULT_BACK_LIGHT: BaseLightProps = {
  intensity: 10,
  position: new Vector3(0, -2, -4),
  angle: 0.5,
  distance: 7.5,
};
