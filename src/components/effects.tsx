import React from 'react';
import {
  EffectComposer,
  HueSaturation,
  SSAO,
} from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';

export function Effects() {
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
}
