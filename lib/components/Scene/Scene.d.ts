import React from 'react';
import type { Matrix4, Quaternion } from 'three';
import { Euler, Vector3 } from 'three';
import type { EmptyProps } from '../../types';
type Object3DProps = {
    position?: Vector3;
    up?: Vector3;
    scale?: number | Vector3;
    rotation?: Euler;
    matrix?: Matrix4;
    quaternion?: Quaternion;
};
export type SceneProps<T = EmptyProps> = {
    /** Source path to scene file */
    src: string;
    /** Cast and receive shadows */
    shadows?: boolean;
    /** Control over light intensity in scene */
    lightIntensity?: number;
    /** Rotation speed of scene: set this to `0` to disable rotation */
    rotationSpeed?: number;
} & Object3DProps & {
    /** Extra props defined in the three.js docs */
    extraProps?: T;
};
export declare const Scene: <T extends Record<string, unknown> = EmptyProps>({ src, shadows, lightIntensity, rotationSpeed, position, up, scale, rotation, matrix, quaternion, extraProps, }: SceneProps<T>) => React.JSX.Element;
export {};
//# sourceMappingURL=Scene.d.ts.map