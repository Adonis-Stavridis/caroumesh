import React from 'react';
import type { DebugOptions, Dimensions, LightsOptions, Styles } from './Caroumesh.types';
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
    /** Control some of the light's behavior */
    lights?: LightsOptions;
    /** Radius of carousel (default: 10) */
    radius?: number;
    /** Time to transition to new scene, in ms (default: 1000) */
    animationTime?: number;
    /** Options to help when debugging
     * @suggestion Do not use in production
     */
    debugOptions?: DebugOptions;
    /** Set of styles to customize */
    styles?: Styles;
};
export declare const Caroumesh: ({ className, scenes, dimensions, shadows, controls, radius, animationTime, lights, debugOptions, styles, }: CaroumeshProps) => React.JSX.Element;
//# sourceMappingURL=Caroumesh.d.ts.map