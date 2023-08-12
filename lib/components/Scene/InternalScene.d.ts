import React from 'react';
import type { SceneProps } from './Scene';
type VisibleSceneProps = {
    visible?: boolean;
};
export type InternalSceneProps = SceneProps<VisibleSceneProps>;
export declare const InternalScene: ({ extraProps, ...props }: InternalSceneProps) => React.JSX.Element;
export {};
//# sourceMappingURL=InternalScene.d.ts.map