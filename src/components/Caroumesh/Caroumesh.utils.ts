import { CSSProperties, KeyboardEvent } from 'react';
import tinycolor from 'tinycolor2';

export const onKeyDownHandler = (
  event: KeyboardEvent,
  actions: {
    rotateLeft: () => void;
    rotateRight: () => void;
    resetControls: (manual?: boolean) => void;
  },
) => {
  event.preventDefault();
  event.stopPropagation();
  switch (event.code) {
    case 'ArrowLeft':
      actions.rotateLeft();
      break;
    case 'ArrowRight':
      actions.rotateRight();
      break;
    case 'Space':
      actions.resetControls(true);
      break;
    default:
      break;
  }
};

export const getColorsFromColorTheme = (color: CSSProperties['color']) =>
  color
    ? {
        '--caroumesh-color-theme': color,
        '--caroumesh-interaction-color': tinycolor(color).brighten(40),
      }
    : {};
