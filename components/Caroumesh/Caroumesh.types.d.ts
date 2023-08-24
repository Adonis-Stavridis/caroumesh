import type { CSSProperties } from 'react';
import { EffectsProps } from 'src/lib/components/Effects/Effects';
import { ThreePointLightsProps } from 'src/lib/components/ThreePointLights';
export type Dimensions = {
    width?: number;
    height?: number;
} | [number, number];
export type LightsOptions = Omit<ThreePointLightsProps, 'shadows'> & {
    /** Lights nodes from [three.js](https://threejs.org/docs/?q=light#api/en/lights/AmbientLight) */
    customLights?: React.ReactNode;
};
export type EffectsOptions = EffectsProps;
export type Styles = {
    colorTheme?: CSSProperties['color'];
    backgroundColor?: CSSProperties['color'];
    hasBorder?: boolean;
    borderColor?: CSSProperties['borderColor'];
    isBorderRounded?: boolean;
};
//# sourceMappingURL=Caroumesh.types.d.ts.map