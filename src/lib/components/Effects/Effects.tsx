import {
  EffectComposer,
  EffectComposerProps,
} from '@react-three/postprocessing';
import React from 'react';

export type EffectsProps = Omit<EffectComposerProps, 'enabled' | 'children'> & {
  /** Effects nodes from [react-postprocessing](https://docs.pmnd.rs/react-postprocessing/effects) */
  children?: JSX.Element | JSX.Element[];
};

export const Effects = ({ children, ...effectComposerProps }: EffectsProps) => (
  <EffectComposer
    enabled={
      Array.isArray(children) ? children.length > 0 : children !== undefined
    }
    {...effectComposerProps}
  >
    {children ?? []}
  </EffectComposer>
);
