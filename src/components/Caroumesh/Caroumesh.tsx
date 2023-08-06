import { OrbitControls, Stats } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import cx from 'classnames';
import React from 'react';
import { PCFSoftShadowMap } from 'three';
import type { OrbitControls as OrbitControlsType } from 'three-stdlib';

import type {
  DebugOptions,
  Dimensions,
  LightsOptions,
  Styles,
} from './Caroumesh.types';
import { onKeyDownHandler } from './Caroumesh.utils';
import { ErrorBoundary, ProgressLoader } from '../../lib/components';
import { Overlay } from '../../lib/components/Overlay';
import { SceneObject } from '../../lib/components/Scene';
import { ThreePointLights } from '../../lib/components/ThreePointLights';
import { useCarousel } from '../../lib/hooks';
import { ClassNameProps, isNumberTuple } from '../../lib/types';

import './Caroumesh.scss';

const CN = 'caroumesh';

export type CaroumeshProps = ClassNameProps & {
  /** Scenes of the carousel */
  scenes: SceneObject[];
  /** Fixed dimensions of the component
   * (by default the component fills parent's space)
   */
  dimensions?: Dimensions;
  /** Render shadows */
  shadows?: boolean;
  /** Use Orbit controls */
  controls?: boolean;
  /** Control some of the light's behavior */
  lights?: LightsOptions;
  /** Options to help when debugging
   * @suggestion Do not use in production
   */
  debugOptions?: DebugOptions;
  /** Set of styles to customize */
  styles?: Styles;
};

export const Caroumesh = ({
  className,
  scenes,
  dimensions,
  shadows = false,
  lights,
  controls = false,
  debugOptions = {
    stats: false,
    gizmos: false,
  },
  styles = {
    hasBorder: false,
    isBorderRounded: false,
  },
}: CaroumeshProps) => {
  const controlsRef = React.useRef<OrbitControlsType>(null);

  const {
    scenes: scenesComponents,
    rotateLock,
    rotateLeft: turnLeft,
    rotateRight: turnRight,
  } = useCarousel(scenes, {
    shadows,
  });

  const resetControls = React.useCallback(
    (manual = false) => {
      if (rotateLock || (manual && !controls)) return; // ignore all events
      controlsRef.current?.reset();
    },
    [rotateLock, controls],
  );

  const rotateLeft = React.useCallback(() => {
    if (rotateLock) return; // ignore all events
    resetControls();
    turnLeft();
  }, [rotateLock, resetControls, turnLeft]);

  const rotateRight = React.useCallback(() => {
    if (rotateLock) return; // ignore all events
    resetControls();
    turnRight();
  }, [rotateLock, resetControls, turnRight]);

  const dimensionsProps = React.useMemo(
    () =>
      isNumberTuple(dimensions)
        ? { width: dimensions[0], height: dimensions[1] }
        : dimensions,
    [dimensions],
  );

  return (
    <ErrorBoundary>
      <div
        id="caroumesh"
        className={cx(CN, className, {
          [`${CN}-styles--has-border`]: styles.hasBorder,
          [`${CN}-styles--is-border-rounded`]: styles.isBorderRounded,
        })}
        style={{
          ...dimensionsProps,
          backgroundColor: styles.backgroundColor,
        }}
        tabIndex={0}
        role="button"
        onKeyDown={(event) =>
          onKeyDownHandler(event, {
            rotateLeft,
            rotateRight,
            resetControls,
          })
        }
      >
        <Canvas
          className={cx(`${CN}-canvas`, {
            [`${CN}-canvas--has-controls`]: controls,
          })}
          shadows={{ enabled: shadows, type: PCFSoftShadowMap }}
          camera={{ fov: 45, position: [0, 0.5, 5] }}
        >
          <React.Suspense fallback={<ProgressLoader />}>
            {/* Scenes */}
            {scenesComponents}

            {/* Lights */}
            <ThreePointLights
              shadows={shadows}
              helpers={debugOptions.gizmos}
              {...lights}
            />

            {/* Extra components */}
            <OrbitControls
              ref={controlsRef}
              enabled={controls && !rotateLock}
            />
            {debugOptions.stats && <Stats />}
          </React.Suspense>
        </Canvas>

        {scenes.length > 1 && (
          <Overlay onClickLeft={rotateLeft} onClickRight={rotateRight} />
        )}
      </div>
    </ErrorBoundary>
  );
};
