import React, {
  KeyboardEventHandler,
  MouseEventHandler,
  useState,
} from 'react';
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

  const [hover, setHover] = useState<boolean>(false);

  const pointerCursor = (_event: React.MouseEvent<HTMLDivElement>) => {
    setHover(true);
  };

  const defaultCursor = (_event: React.MouseEvent<HTMLDivElement>) => {
    setHover(false);
  };

  return (
    <div
      style={{
        zIndex: 10,
        position: 'absolute',
        width: '100%',
        height: '100%',
        cursor: hover ? 'pointer' : 'default',
      }}
      tabIndex={0}
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
      >
        <div
          onClick={props.left}
          onMouseEnter={pointerCursor}
          onMouseLeave={defaultCursor}
        >
          <ChevronLeft
            style={{ width: '1.5em', height: '1.5em', margin: '0.5em' }}
            color={props.color ?? defaultValues.color}
          />
        </div>
      </div>
      <div
        style={{
          float: 'right',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div
          onClick={props.right}
          onMouseEnter={pointerCursor}
          onMouseLeave={defaultCursor}
        >
          <ChevronRight
            style={{ width: '1.5em', height: '1.5em', margin: '0.5em' }}
            color={props.color ?? defaultValues.color}
          />
        </div>
      </div>
    </div>
  );
}
