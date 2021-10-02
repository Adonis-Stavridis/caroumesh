import React, { KeyboardEventHandler, MouseEventHandler } from 'react';
import { ChevronLeft, ChevronRight } from 'react-bootstrap-icons';

type ControlsProps = {
  keys: KeyboardEventHandler<HTMLDivElement>;
  left: MouseEventHandler<HTMLDivElement>;
  right: MouseEventHandler<HTMLDivElement>;
  color?: string;
};

type DefaultValues = {
  color: string;
};

export function Controls(props: ControlsProps) {
  const defaultValues: DefaultValues = {
    color: 'white',
  };

  return (
    <div
      style={{
        zIndex: 10,
        position: 'absolute',
        width: '100%',
        height: '100%',
      }}
      tabIndex={-1}
      onKeyDown={props.keys}
    >
      <div
        style={{
          float: 'left',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onClick={props.left}
      >
        <ChevronLeft
          style={{ width: '1.5em', height: '1.5em' }}
          color={props.color ?? defaultValues.color}
        />
      </div>
      <div
        style={{
          float: 'right',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onClick={props.right}
      >
        <ChevronRight
          style={{ width: '1.5em', height: '1.5em' }}
          color={props.color ?? defaultValues.color}
        />
      </div>
    </div>
  );
}
