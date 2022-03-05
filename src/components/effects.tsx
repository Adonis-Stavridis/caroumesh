import React from 'react';
import {
  EffectComposer,
  HueSaturation,
  SSAO
} from '@react-three/postprocessing';
import { BlendFunction } from '@react-three/postprocessing/node_modules/postprocessing/build/postprocessing';

export const Effects = () => {
  return (
    <EffectComposer>
      <SSAO
        blendFunction={BlendFunction.MULTIPLY}
        samples={30}
        rings={4}
        distanceThreshold={1.0}
        distanceFalloff={0.0}
        rangeThreshold={0.5}
        rangeFalloff={0.1}
        luminanceInfluence={0.9}
        radius={20}
        scale={0.5}
        bias={0.5}
      />
      <HueSaturation
        blendFunction={BlendFunction.NORMAL}
        hue={0}
        saturation={0.2}
      />
    </EffectComposer>
  );
};
