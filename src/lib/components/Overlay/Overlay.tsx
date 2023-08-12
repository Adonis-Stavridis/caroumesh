import cx from 'classnames';
import type { MouseEventHandler } from 'react';
import React from 'react';
import { CaretLeftFill, CaretRightFill } from 'react-bootstrap-icons';

import './Overlay.scss';

const CN = 'overlay';

type OverlayProps = {
  locked?: boolean;
  onClickLeft?: MouseEventHandler;
  onClickRight?: MouseEventHandler;
};

export const Overlay = ({
  locked,
  onClickLeft,
  onClickRight,
}: OverlayProps) => (
  <div className={CN}>
    <div
      className={`${CN}-click-area`}
      tabIndex={0}
      role="button"
      onClick={onClickLeft}
      aria-hidden="true"
    >
      <CaretLeftFill
        className={cx(`${CN}-click-area-icon`, {
          [`${CN}-click-area-icon--locked`]: locked,
        })}
      />
    </div>
    <div
      className={`${CN}-click-area`}
      tabIndex={0}
      role="button"
      onClick={onClickRight}
      aria-hidden="true"
    >
      <CaretRightFill
        className={cx(`${CN}-click-area-icon`, {
          [`${CN}-click-area-icon--locked`]: locked,
        })}
      />
    </div>
  </div>
);
