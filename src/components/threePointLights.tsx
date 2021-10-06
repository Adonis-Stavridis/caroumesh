import React, { Fragment } from 'react';

type ThreePointLightsProps = {
  shadows?: boolean;
};

export function ThreePointLights(props: ThreePointLightsProps) {
  return (
    <Fragment>
      <pointLight
        color="white"
        intensity={1}
        position={[8, 8, 8]}
        castShadow={props.shadows}
        shadowBias={-0.0001}
        shadowMapWidth={2048}
        shadowMapHeight={2048}
      />
      <pointLight color="white" intensity={0.3} position={[-8, 0, 8]} />
    </Fragment>
  );
}
