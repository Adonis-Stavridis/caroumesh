import React, {
  CSSProperties,
  Suspense,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Canvas } from '@react-three/fiber';
import { Stats } from '@react-three/drei';
import { Color, Vector3 } from 'three';

import { Effects } from './effects';
import { Loader } from './loader';
import { Model } from './model';
import { Controls } from './controls';
import { lerp } from 'three/src/math/MathUtils';

type CaroumeshProps = {
  width?: number;
  height?: number;
  backgroundColor?: [Color] | [number, number, number];
  style?: CSSProperties;
  children?: JSX.Element[];
  effects?: boolean;
  stats?: boolean;
  shadows?: boolean;
  distance?: number;
};

type DefaultValues = {
  distance: number;
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
    distance: 10,
    yPosition: 0,
    width: '100%',
    height: '100%',
    animationTime: 1000,
  };

  const [models, setModels] = useState<StateModelProps[]>([]);
  const indexOffset = useRef<number>(0);
  const rotateLock = useRef<boolean>(false);

  const initModels = () => {
    var children: JSX.Element[] = props.children ?? [];
    if (!Array.isArray(children)) {
      children = [children];
    }

    const distance = props.distance ?? defaultValues.distance;

    var newModels: StateModelProps[] = [];

    children.forEach((element, index) => {
      if (element.type === Model) {
        var newPosition = new Vector3(
          distance *
            Math.sin(((2 * Math.PI) / children.length) * index + Math.PI),
          defaultValues.yPosition,
          distance *
            Math.cos(((2 * Math.PI) / children.length) * index + Math.PI) +
            distance
        );
        element.props.offset && newPosition.add(element.props.offset);
        newModels.push({
          position: newPosition,
          other: element.props,
        });
      } else
        console.log('Caroumesh only accepts <Model/> components... for now');
    });

    setModels(newModels);
  };

  const renderModels = () => {
    const distance = props.distance ?? defaultValues.distance;

    var newModels: StateModelProps[] = [...models];

    newModels.forEach((element, index) => {
      var newPosition = new Vector3(
        distance *
          Math.sin(
            ((2 * Math.PI) / newModels.length) *
              ((index + indexOffset.current) % newModels.length) +
              Math.PI
          ),
        defaultValues.yPosition,
        distance *
          Math.cos(
            ((2 * Math.PI) / newModels.length) *
              ((index + indexOffset.current) % newModels.length) +
              Math.PI
          ) +
          distance
      );
      element.other.offset && newPosition.add(element.other.offset);
      newModels[index].position = newPosition;
    });

    setModels(newModels);
  };

  const rotate = (target: number) => {
    var animFrame = 0;
    var startTime = 0;

    const startValue = indexOffset.current;

    rotateLock.current = true;

    const stopInterpolation = () => {
      cancelAnimationFrame(animFrame);
      indexOffset.current = target % models.length;
      renderModels();

      rotateLock.current = false;
    };

    const interpolation = (time: number) => {
      if (startTime == 0) startTime = time;

      const elapsedTime = time - startTime;

      indexOffset.current = lerp(
        startValue,
        target,
        elapsedTime / defaultValues.animationTime
      );
      renderModels();

      if (elapsedTime < defaultValues.animationTime) {
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

  const keyDownEvent = (event: React.KeyboardEvent<HTMLInputElement>) => {
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

  useEffect(() => {
    initModels();
  }, [props.children]);

  return (
    <div
      style={{
        ...props.style,
        width: props.width ?? defaultValues.width,
        height: props.height ?? defaultValues.height,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {models.length > 1 && (
        <Controls keys={keyDownEvent} left={rotateLeft} right={rotateRight} />
      )}

      <Canvas
        {...props}
        shadows={props.shadows}
        camera={{ fov: 45, position: [0, 0.5, 5] }}
        style={{
          position: 'absolute',
        }}
      >
        {props.backgroundColor && (
          <color attach="background" args={props.backgroundColor} />
        )}

        <Suspense fallback={<Loader />}>
          <pointLight
            color="white"
            intensity={1}
            position={[8, 8, 8]}
            castShadow={props.shadows}
            shadowBias={-0.0001}
            shadowMapWidth={2048}
            shadowMapHeight={2048}
          />
          <pointLight color="white" intensity={0.3} position={[-8, 0, 8]} />

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
