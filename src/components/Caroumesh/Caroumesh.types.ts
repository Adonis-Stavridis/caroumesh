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
  /** Display light gizmos */
  gizmos?: boolean;
};

export type Styles = {
  hasBorder?: boolean;
  backgroundColor?: CSSProperties['color'];
  borderColor?: CSSProperties['borderColor'];
  isBorderRounded?: boolean;
};