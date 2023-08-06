import cx from 'classnames';
import type { MouseEventHandler } from 'react';
import React from 'react';
import { CaretLeftFill, CaretRightFill } from 'react-bootstrap-icons';

import './Overlay.scss';

const CN = 'overlay';

type OverlayProps = {
  onClickLeft?: MouseEventHandler;
  onClickRight?: MouseEventHandler;
};

export const Overlay = ({ onClickLeft, onClickRight }: OverlayProps) => (
  <div className={cx(CN)}>
    <div
      className={`${CN}-click-area`}
      tabIndex={0}
      role="button"
      onClick={onClickLeft}
      aria-hidden="true"
    >
      <CaretLeftFill className={`${CN}-click-area-icon`} />
    </div>
    <div
      className={`${CN}-click-area`}
      tabIndex={0}
      role="button"
      onClick={onClickRight}
      aria-hidden="true"
    >
      <CaretRightFill className={`${CN}-click-area-icon`} />
    </div>
  </div>
);
