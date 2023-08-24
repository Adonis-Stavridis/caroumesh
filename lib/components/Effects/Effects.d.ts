import { EffectComposerProps } from '@react-three/postprocessing';
import React from 'react';
export type EffectsProps = Omit<EffectComposerProps, 'enabled' | 'children'> & {
    /** Effects nodes from [react-postprocessing](https://docs.pmnd.rs/react-postprocessing/effects) */
    children?: JSX.Element | JSX.Element[];
};
export declare const Effects: ({ children, ...effectComposerProps }: EffectsProps) => React.JSX.Element;
//# sourceMappingURL=Effects.d.ts.map