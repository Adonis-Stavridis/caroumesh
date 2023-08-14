import React from 'react';
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
export declare const ThreePointLights: ({ shadows, helpers, shadowBias, keyLight, fillLight, backLight, }: ThreePointLightsProps) => React.JSX.Element;
//# sourceMappingURL=ThreePointLights.d.ts.map