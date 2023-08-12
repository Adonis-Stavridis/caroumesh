import type { CSSProperties } from 'react';

export type Dimensions =
  | {
      width?: number;
      height?: number;
    }
  | [number, number];

export type LightsOptions = {
  /** Shadow bias affecting shadow quality */
  shadowBias?: number;
};

export type DebugOptions = {
  /** Display statistics */
  stats?: boolean;
  /** Display default three point lights gizmos */
  defaultLightsGizmos?: boolean;
};

export type Styles = {
  hasBorder?: boolean;
  backgroundColor?: CSSProperties['color'];
  borderColor?: CSSProperties['borderColor'];
  isBorderRounded?: boolean;
};
