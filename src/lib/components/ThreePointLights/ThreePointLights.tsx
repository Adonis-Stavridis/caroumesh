import { useHelper } from '@react-three/drei';
import React from 'react';
import { Object3D, SpotLightHelper } from 'three';

import type { OptionalProps } from '../../types';

const SHADOW_MAP_SIZE = 1024;

type ThreePointLightsProps = {
  shadows?: boolean;
  shadowsBias?: number;
  helpers?: boolean;
};

const DEFAULTS: OptionalProps<ThreePointLightsProps> = {
  shadows: false,
  shadowsBias: -0.0025,
  helpers: false,
};

export const ThreePointLights = ({
  shadows = DEFAULTS.shadows,
  shadowsBias = DEFAULTS.shadowsBias,
  helpers = DEFAULTS.helpers,
}: ThreePointLightsProps) => {
  const spotLight1 = React.useRef(null);
  const spotLight2 = React.useRef(null);
  const spotLight3 = React.useRef(null);

  /**
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

  return (
    <>
      <spotLight
        ref={helpers ? spotLight1 : undefined}
        intensity={50}
        position={[4, 2, 4]}
        angle={0.3}
        distance={10}
        castShadow={shadows}
        shadow-bias={shadowsBias}
        shadow-mapSize-width={SHADOW_MAP_SIZE}
        shadow-mapSize-height={SHADOW_MAP_SIZE}
      />
      <spotLight
        ref={helpers ? spotLight2 : undefined}
        intensity={20}
        position={[-4, 0, 4]}
        angle={0.5}
        distance={7.5}
      />
      <spotLight
        ref={helpers ? spotLight3 : undefined}
        intensity={15}
        position={[0, -2, -4]}
        angle={0.5}
        distance={7.5}
      />
    </>
  );
};
