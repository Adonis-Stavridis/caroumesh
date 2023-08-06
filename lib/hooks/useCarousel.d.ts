import React from 'react';
import { SceneObject } from '../components/Scene';
import type { SceneProps } from '../components/Scene/Scene';
type PassedProps = Pick<SceneProps, 'shadows'>;
export declare const useCarousel: (scenes: SceneObject[], passedProps: PassedProps) => {
    scenes: React.JSX.Element[];
    rotateLock: boolean;
    rotateLeft: () => void;
    rotateRight: () => void;
};
export {};
