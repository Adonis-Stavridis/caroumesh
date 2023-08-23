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

export const getColorTheme = (color: CSSProperties['color']) => {
  // Depending on color brightness we darken or lighten color on locked transition
  const colorBrightness = tinycolor(color).getBrightness();
  const lockFilter =
    colorBrightness > 127 ? 'brightness(75%)' : 'brightness(125%)';

  return color
    ? {
        '--caroumesh-color-theme': color,
        '--caroumesh-lock-filter': lockFilter,
      }
    : {};
};
