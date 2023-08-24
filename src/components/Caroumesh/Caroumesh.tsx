import { OrbitControls, Stats } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import cx from 'classnames';
import React from 'react';
import { PCFSoftShadowMap } from 'three';
import type { OrbitControls as OrbitControlsType } from 'three-stdlib';

import { Effects } from 'src/lib/components/Effects/Effects';

import { ANIMATION_TIME, CAROUSEL_RADIUS } from './Caroumesh.constants';
import type {
  Dimensions,
  EffectsOptions,
  LightsOptions,
  Styles,
} from './Caroumesh.types';
import { getColorTheme, onKeyDownHandler } from './Caroumesh.utils';
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
   * (default: fills parent's space)
   */
  dimensions?: Dimensions;
  /** Render shadows */
  shadows?: boolean;
  /** Use Orbit controls */
  controls?: boolean;
  /** Control lighting behavior */
  lights?: LightsOptions;
  /** Add postprocessing effects */
  effects?: EffectsOptions;
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

export const Caroumesh = ({
  className,
  scenes,
  dimensions,
  shadows,
  controls,
  lights,
  effects,
  radius = CAROUSEL_RADIUS,
  animationTime = ANIMATION_TIME,
  stats,
  styles,
}: CaroumeshProps) => {
  const controlsRef = React.useRef<OrbitControlsType>(null);
  const [isPending, startTransition] = React.useTransition();

  const {
    scenes: scenesComponents,
    rotateLock: rotating,
    rotateLeft: turnLeft,
    rotateRight: turnRight,
  } = useCarousel({
    scenes,
    passedProps: {
      shadows,
    },
    radius,
    animationTime,
  });

  const rotateLock = rotating || isPending;

  const resetControls = React.useCallback(
    (manual = false) => {
      if (rotateLock || (manual && !controls)) return; // ignore all events
      controlsRef.current?.reset();
    },
    [rotateLock, controls],
  );

  const rotateLeft = React.useCallback(() => {
    startTransition(() => {
      if (rotateLock) return; // ignore all events
      resetControls();
      turnLeft();
    });
  }, [rotateLock, resetControls, turnLeft]);

  const rotateRight = React.useCallback(() => {
    startTransition(() => {
      if (rotateLock) return; // ignore all events
      resetControls();
      turnRight();
    });
  }, [rotateLock, resetControls, turnRight]);

  const dimensionsProps = React.useMemo(
    () =>
      isNumberTuple(dimensions)
        ? { width: dimensions[0], height: dimensions[1] }
        : dimensions,
    [dimensions],
  );

  const colorThemeColors = React.useMemo(
    () => getColorTheme(styles?.colorTheme),
    [styles?.colorTheme],
  );

  const lightsComponents = React.useMemo(
    () =>
      lights?.customLights ? (
        lights.customLights
      ) : (
        <ThreePointLights shadows={shadows} {...lights} />
      ),
    [lights, shadows],
  );

  return (
    <ErrorBoundary>
      <div
        id="caroumesh"
        className={cx(CN, className, {
          [`${CN}-styles--has-border`]: styles?.hasBorder,
          [`${CN}-styles--is-border-rounded`]: styles?.isBorderRounded,
        })}
        style={{
          ...dimensionsProps,
          ...colorThemeColors,
          backgroundColor: styles?.backgroundColor,
          borderColor: styles?.borderColor,
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
            {lightsComponents}

            {/* Effects */}
            <Effects {...effects} />

            {/* Extra components */}
            <OrbitControls
              ref={controlsRef}
              enabled={!!controls && !rotateLock}
            />
            {stats && <Stats />}
          </React.Suspense>
        </Canvas>

        {scenes.length > 1 && (
          <Overlay
            onClickLeft={rotateLeft}
            onClickRight={rotateRight}
            locked={rotateLock}
          />
        )}
      </div>
    </ErrorBoundary>
  );
};
