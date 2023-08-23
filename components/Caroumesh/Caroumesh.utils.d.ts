import { CSSProperties, KeyboardEvent } from 'react';
export declare const onKeyDownHandler: (event: KeyboardEvent, actions: {
    rotateLeft: () => void;
    rotateRight: () => void;
    resetControls: (manual?: boolean) => void;
}) => void;
export declare const getColorTheme: (color: CSSProperties['color']) => {
    '--caroumesh-color-theme': import("csstype").Property.Color;
    '--caroumesh-lock-filter': string;
} | {
    '--caroumesh-color-theme'?: undefined;
    '--caroumesh-lock-filter'?: undefined;
};
//# sourceMappingURL=Caroumesh.utils.d.ts.map