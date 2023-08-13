import { useHelper } from '@react-three/drei';
import React from 'react';
import { Object3D, SpotLightHelper } from 'three';

import {
  DEFAULT_BACK_LIGHT,
  DEFAULT_FILL_LIGHT,
  DEFAULT_KEY_LIGHT,
  SHADOW_BIAS,
  SHADOW_MAP_SIZE,
} from './ThreePointLights.constants';
import { BaseLightProps } from './ThreePointLights.types';

export type ThreePointLightsProps = {
  /** Enable lights emitting shadows */
  shadows?: boolean;
  /** Display lights gizmos */
  helpers?: boolean;
  /** Shadow bias affecting shadow quality */
  shadowBias?: number;
  /** Primary light, on the top right of camera */
  keyLight?: BaseLightProps;
  /** Secondary light, on the left of camera */
  fillLight?: BaseLightProps;
  /** Tertiary light, behind scenes */
  backLight?: BaseLightProps;
};

export const ThreePointLights = ({
  shadows,
  helpers,
  shadowBias = SHADOW_BIAS,
  keyLight,
  fillLight,
  backLight,
}: ThreePointLightsProps) => {
  const spotLight1 = React.useRef(null);
  const spotLight2 = React.useRef(null);
  const spotLight3 = React.useRef(null);

  /**
   * TODO: Improve handling of helpers
   * We type as unknown then as Mutable to make tsc happy
   */
  useHelper(
    spotLight1 as unknown as React.MutableRefObject<Object3D>,
    SpotLightHelper,
    'red',
  );
  useHelper(
    spotLight2 as unknown as React.MutableRefObject<Object3D>,
    SpotLightHelper,
    'green',
  );
  useHelper(
    spotLight3 as unknown as React.MutableRefObject<Object3D>,
    SpotLightHelper,
    'blue',
  );

  // Merge default and custom props
  const keyLightProps = React.useMemo(
    () => ({ ...DEFAULT_KEY_LIGHT, ...keyLight }),
    [keyLight],
  );
  const fillLightProps = React.useMemo(
    () => ({ ...DEFAULT_FILL_LIGHT, ...fillLight }),
    [fillLight],
  );
  const backLightProps = React.useMemo(
    () => ({ ...DEFAULT_BACK_LIGHT, ...backLight }),
    [backLight],
  );

  return (
    <>
      {/* Key Light */}
      <spotLight
        ref={helpers ? spotLight1 : undefined}
        castShadow={shadows}
        shadow-bias={shadowBias}
        shadow-mapSize-width={SHADOW_MAP_SIZE}
        shadow-mapSize-height={SHADOW_MAP_SIZE}
        {...keyLightProps}
      />

      {/* Fill Light */}
      <spotLight ref={helpers ? spotLight2 : undefined} {...fillLightProps} />

      {/* Back Light */}
      <spotLight ref={helpers ? spotLight3 : undefined} {...backLightProps} />
    </>
  );
};
