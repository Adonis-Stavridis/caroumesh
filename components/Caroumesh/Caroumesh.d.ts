import React from 'react';
import type { Dimensions, LightsOptions, Styles } from './Caroumesh.types';
import { SceneObject } from '../../lib/components/Scene';
import { ClassNameProps } from '../../lib/types';
export type CaroumeshProps = ClassNameProps & {
    /** Scenes of the carousel */
    scenes: SceneObject[];
    /** Fixed dimensions of the component
     * (default: fills parent's space)
     */
    dimensions?: Dimensions;
    /** Render shadows */
    shadows?: boolean;
    /** Use Orbit controls */
    controls?: boolean;
    /** Control lighting behavior */
    lights?: LightsOptions;
    /** Control how far apart scenes are from one another (default: 10) */
    radius?: number;
    /** Time to transition to new scene, in ms (default: 1000) */
    animationTime?: number;
    /** Show statistics of Caroumesh performance
     * @suggestion Only use this when debugging
     */
    stats?: boolean;
    /** Set of styles to customize */
    styles?: Styles;
};
export declare const Caroumesh: ({ className, scenes, dimensions, shadows, controls, radius, animationTime, lights, stats, styles, }: CaroumeshProps) => React.JSX.Element;
//# sourceMappingURL=Caroumesh.d.ts.map