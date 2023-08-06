import React from 'react';

import type { SceneProps } from './Scene';
import { Scene } from './Scene';
import type { OptionalProps } from '../../types';
type VisibleSceneProps = { visible?: boolean };

export type InternalSceneProps = SceneProps<VisibleSceneProps>;

const DEFAULTS: OptionalProps<VisibleSceneProps> = {
  visible: true,
};

export const InternalScene = ({
  extraProps = { visible: DEFAULTS.visible },
  ...props
}: InternalSceneProps) => (
  <Scene<VisibleSceneProps> {...props} extraProps={extraProps} />
);
