import { CSSProperties, KeyboardEvent } from 'react';
import tinycolor from 'tinycolor2';
export declare const onKeyDownHandler: (event: KeyboardEvent, actions: {
    rotateLeft: () => void;
    rotateRight: () => void;
    resetControls: (manual?: boolean) => void;
}) => void;
export declare const getColorsFromColorTheme: (color: CSSProperties['color']) => {
    '--caroumesh-color-theme': import("csstype").Property.Color;
    '--caroumesh-interaction-color': tinycolor.Instance;
} | {
    '--caroumesh-color-theme'?: undefined;
    '--caroumesh-interaction-color'?: undefined;
};
//# sourceMappingURL=Caroumesh.utils.d.ts.map