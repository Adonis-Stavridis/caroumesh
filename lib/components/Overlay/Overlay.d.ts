import type { MouseEventHandler } from 'react';
import React from 'react';
type OverlayProps = {
    onClickLeft?: MouseEventHandler;
    onClickRight?: MouseEventHandler;
};
export declare const Overlay: ({ onClickLeft, onClickRight }: OverlayProps) => React.JSX.Element;
export {};
