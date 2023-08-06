import { KeyboardEvent } from 'react';

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
