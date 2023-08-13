import { Vector3 } from 'three';

export type BaseLightProps = {
  intensity?: number;
  position?: Vector3;
  angle?: number;
  distance?: number;
  color?: string;
};
