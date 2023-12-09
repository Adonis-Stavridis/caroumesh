import React from 'react';
import { Object3DProps } from './Scene.types';
import type { EmptyProps } from '../../types';
export type SceneProps<T = EmptyProps> = {
    /** Source path to scene file */
    src: string;
    /** Cast and receive shadows */
    shadows?: boolean;
    /** Control intensity of lights in scene */
    lightIntensity?: number;
    /** Rotation speed of scene: set to `0` to disable rotation */
    rotationSpeed?: number;
} & Object3DProps & {
    /** Extra props defined in the three.js docs */
    extraProps?: T;
};
export declare const Scene: <T extends Record<string, unknown> = EmptyProps>({ src, shadows, lightIntensity, rotationSpeed, position, up, scale, rotation, matrix, quaternion, extraProps, }: SceneProps<T>) => React.JSX.Element;
//# sourceMappingURL=Scene.d.ts.map