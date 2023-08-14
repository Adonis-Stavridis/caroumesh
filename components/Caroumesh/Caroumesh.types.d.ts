import type { CSSProperties } from 'react';
import { ThreePointLightsProps } from 'src/lib/components/ThreePointLights';
export type Dimensions = {
    width?: number;
    height?: number;
} | [number, number];
export type LightsOptions = Omit<ThreePointLightsProps, 'shadows'> & {
    /** Custom lights (removes default three point lighting) */
    customLights?: React.ReactNode;
};
export type Styles = {
    backgroundColor?: CSSProperties['color'];
    hasBorder?: boolean;
    borderColor?: CSSProperties['borderColor'];
    isBorderRounded?: boolean;
};
//# sourceMappingURL=Caroumesh.types.d.ts.map