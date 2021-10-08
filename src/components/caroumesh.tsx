import React, {
  CSSProperties,
  KeyboardEvent,
  Suspense,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Canvas } from '@react-three/fiber';
import { Stats } from '@react-three/drei';
import { Vector3 } from 'three';
import { lerp } from 'three/src/math/MathUtils';

import { Effects } from './effects';
import { Loader } from './loader';
import { Model } from './model';
import { Controls } from './controls';
import { ThreePointLights } from './threePointLights';
import { Lights } from './lights';
import { ModelChildrenError } from './caroumeshErrors';

type CaroumeshProps = {
  children?: JSX.Element | JSX.Element[];
  shadows?: boolean;
  radius?: number;
  effects?: boolean;
  stats?: boolean;
  animationTime?: number;
  theme?: string;
  width?: string;
  height?: string;
  backgroundColor?: string;
  border?: string;
  borderRadius?: string;
  style?: CSSProperties;
};

type DefaultValues = {
  radius: number;
  yPosition: number;
  width: string;
  height: string;
  animationTime: number;
};

type StateModelProps = {
  position: Vector3;
  other: any;
};

export function Caroumesh(props: CaroumeshProps) {
  const defaultValues: DefaultValues = {
    radius: 10,
    yPosition: 0,
    width: '100%',
    height: '100%',
    animationTime: 1000,
  };

  const [models, setModels] = useState<StateModelProps[]>([]);
  const lights = useRef<JSX.Element>();
  const indexOffset = useRef<number>(0);
  const rotateLock = useRef<boolean>(false);

  useEffect(() => {
    var children: JSX.Element[] = props.children as Array<JSX.Element>;
    if (!Array.isArray(children)) {
      children = [children];
    }

    const radius = props.radius ?? defaultValues.radius;

    var newModels: StateModelProps[] = [];

    const initModel = (value: JSX.Element, index: number) => {
      var newPosition = new Vector3(
        radius * Math.sin(((2 * Math.PI) / children.length) * index + Math.PI),
        defaultValues.yPosition,
        radius * Math.cos(((2 * Math.PI) / children.length) * index + Math.PI) +
          radius
      );
      value.props.offset && newPosition.add(value.props.offset);
      newModels.push({
        position: newPosition,
        other: value.props,
      });
    };

    const initLights = (value: JSX.Element) => {
      lights.current = value;
    };

    children.forEach((value, index) => {
      switch (value.type) {
        case Model:
          initModel(value, index);
          break;
        case Lights:
          initLights(value);
          break;
        default:
          ModelChildrenError();
      }
    });

    setModels(newModels);
  }, [
    props.children,
    props.radius,
    defaultValues.radius,
    defaultValues.yPosition,
  ]);

  const renderModels = () => {
    const radius = props.radius ?? defaultValues.radius;

    var newModels: StateModelProps[] = [...models];

    newModels.forEach((value, index) => {
      var newPosition = new Vector3(
        radius *
          Math.sin(
            ((2 * Math.PI) / newModels.length) *
              ((index + indexOffset.current) % newModels.length) +
              Math.PI
          ),
        defaultValues.yPosition,
        radius *
          Math.cos(
            ((2 * Math.PI) / newModels.length) *
              ((index + indexOffset.current) % newModels.length) +
              Math.PI
          ) +
          radius
      );
      value.other.offset && newPosition.add(value.other.offset);
      newModels[index].position = newPosition;
    });

    setModels(newModels);
  };

  const rotate = (target: number) => {
    var animFrame = 0;
    var startTime = 0;

    const startValue = indexOffset.current;
    const animationTime = props.animationTime ?? defaultValues.animationTime;

    rotateLock.current = true;

    const stopInterpolation = () => {
      cancelAnimationFrame(animFrame);
      indexOffset.current = target % models.length;
      renderModels();

      rotateLock.current = false;
    };

    const interpolation = (time: number) => {
      if (startTime === 0) startTime = time;

      const elapsedTime = time - startTime;
      const lerpValue = elapsedTime / animationTime;

      indexOffset.current = lerp(
        startValue,
        target,
        (Math.tanh(6 * lerpValue - 2) + 1) / 2
      );
      renderModels();

      if (elapsedTime < animationTime) {
        animFrame = requestAnimationFrame(interpolation);
      } else {
        stopInterpolation();
      }
    };

    animFrame = requestAnimationFrame(interpolation);
  };

  const rotateRight = () => {
    if (rotateLock.current) return;

    const target = indexOffset.current + 1;
    rotate(target);
  };

  const rotateLeft = () => {
    if (rotateLock.current) return;

    const target = indexOffset.current - 1;
    rotate(target);
  };

  const keyDownEvent = (event: KeyboardEvent<HTMLInputElement>) => {
    switch (event.key) {
      case 'ArrowUp':
        rotateRight();
        break;
      case 'ArrowDown':
        rotateLeft();
        break;
      case 'ArrowLeft':
        rotateLeft();
        break;
      case 'ArrowRight':
        rotateRight();
        break;
      default:
        break;
    }
  };

  return (
    <div
      style={{
        width: props.width ?? defaultValues.width,
        height: props.height ?? defaultValues.height,
        border: props.border,
        borderRadius: props.borderRadius,
        position: 'relative',
        overflow: 'hidden',
        boxSizing: 'border-box',
        ...props.style,
      }}
    >
      {models.length > 1 && (
        <Controls
          keys={keyDownEvent}
          left={rotateLeft}
          right={rotateRight}
          color={props.theme}
        />
      )}

      <Canvas
        shadows={props.shadows}
        camera={{ fov: 45, position: [0, 0.5, 5] }}
        style={{
          position: 'absolute',
        }}
      >
        {props.backgroundColor && (
          <color attach="background" args={[props.backgroundColor]} />
        )}

        <Suspense fallback={<Loader color={props.theme} />}>
          {lights.current ?? <ThreePointLights shadows={props.shadows} />}

          {models.map((model, index) => {
            return (
              <Model key={index} position={model.position} {...model.other} />
            );
          })}
        </Suspense>

        {props.effects && <Effects />}
        {props.stats && <Stats />}
      </Canvas>
    </div>
  );
}
