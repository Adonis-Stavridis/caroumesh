import { isString } from 'lodash';
import React from 'react';
import { Vector3 } from 'three';
import { lerp } from 'three/src/math/MathUtils';

import { SceneObject } from '../components/Scene';
import type { InternalSceneProps } from '../components/Scene/InternalScene';
import { InternalScene } from '../components/Scene/InternalScene';
import type { SceneProps } from '../components/Scene/Scene';
import { isSceneProps } from '../types';
import { CaroumeshError, modulo, normalizedSCurve } from '../utils';
const RADIUS_LENGTH = 10;
const ANIMATION_TIME = 1000;

const STORAGE_POSITION = new Vector3(100, 100, 100);

type PassedProps = Pick<SceneProps, 'shadows'>;

type VisibleIndexes = {
  previous: number;
  new: number;
};

export const useCarousel = (
  scenes: SceneObject[],
  passedProps: PassedProps,
) => {
  const [currentSceneIndex, setCurrentSceneIndex] = React.useState(0);
  const [visibleIndexes, setVisibleIndexes] = React.useState<VisibleIndexes>({
    previous: 0,
    new: 0,
  });
  const [rotateLock, setRotateLock] = React.useState(false);

  const rotateToIndex = React.useCallback(
    (targetIndex: number) => {
      let animFrame = 0;
      let startTime = 0;

      const startValue = currentSceneIndex;

      setVisibleIndexes({
        previous: startValue,
        new: modulo(targetIndex, scenes.length),
      });
      setRotateLock(true);

      const stopInterpolation = () => {
        cancelAnimationFrame(animFrame);
        setCurrentSceneIndex(modulo(targetIndex, scenes.length));
        setVisibleIndexes({
          previous: targetIndex,
          new: modulo(targetIndex, scenes.length),
        });
        setRotateLock(false);
      };

      const interpolation = (time: number) => {
        if (startTime === 0) startTime = time;

        const elapsedTime = time - startTime;
        const lerpValue = elapsedTime / ANIMATION_TIME;

        setCurrentSceneIndex(
          lerp(startValue, targetIndex, normalizedSCurve(lerpValue)),
        );

        if (elapsedTime < ANIMATION_TIME) {
          animFrame = requestAnimationFrame(interpolation);
        } else {
          stopInterpolation();
        }
      };

      animFrame = requestAnimationFrame(interpolation);
    },
    [currentSceneIndex, scenes.length],
  );

  const rotateLeft = React.useCallback(() => {
    rotateToIndex(currentSceneIndex - 1);
  }, [rotateToIndex, currentSceneIndex]);

  const rotateRight = React.useCallback(() => {
    rotateToIndex(currentSceneIndex + 1);
  }, [rotateToIndex, currentSceneIndex]);

  const circle = React.useMemo(
    () => (-2 * Math.PI) / scenes.length,
    [scenes.length],
  );

  const isVisible = React.useCallback(
    (index: number) =>
      visibleIndexes.previous === index || visibleIndexes.new === index,
    [visibleIndexes],
  );

  const internalSceneProps = React.useMemo(
    () =>
      scenes.map((scene, index) => {
        const sceneProps: SceneProps | undefined = isString(scene)
          ? { src: scene }
          : isSceneProps(scene)
          ? scene
          : undefined;

        if (!sceneProps) {
          throw new CaroumeshError(
            'useCarousel',
            'Could not match scenes (internal error)',
          );
        }

        const positionInCarousel = new Vector3();
        if (isVisible(index)) {
          const offsetIndex = modulo(index - currentSceneIndex, scenes.length);
          positionInCarousel.add(
            new Vector3(
              RADIUS_LENGTH * Math.sin(circle * offsetIndex + Math.PI),
              0,
              RADIUS_LENGTH * Math.cos(circle * offsetIndex + Math.PI) +
                RADIUS_LENGTH,
            ),
          );
          if (sceneProps.position) {
            positionInCarousel.add(sceneProps.position);
          }
        } else {
          positionInCarousel.add(STORAGE_POSITION);
        }

        const internalSceneProps: InternalSceneProps = {
          ...sceneProps,
          shadows: sceneProps.shadows ?? passedProps.shadows,
          position: positionInCarousel,
          extraProps: { visible: isVisible(index) },
        };

        return internalSceneProps;
      }),
    [scenes, circle, currentSceneIndex, isVisible, passedProps.shadows],
  );

  return {
    scenes: internalSceneProps.map((props, index) => (
      <InternalScene key={`${props.src}-${index}`} {...props} />
    )),
    rotateLock,
    rotateLeft,
    rotateRight,
  };
};
