import React from 'react';
import { SceneObject } from '../components/Scene';
import type { SceneProps } from '../components/Scene/Scene';
type PassedProps = Pick<SceneProps, 'shadows'>;
type useCarouselProps = {
    scenes: SceneObject[];
    passedProps: PassedProps;
    radius: number;
    animationTime: number;
};
export declare const useCarousel: ({ scenes, passedProps, radius, animationTime, }: useCarouselProps) => {
    scenes: React.JSX.Element[];
    rotateLock: boolean;
    rotateLeft: () => void;
    rotateRight: () => void;
};
export {};
//# sourceMappingURL=useCarousel.d.ts.map