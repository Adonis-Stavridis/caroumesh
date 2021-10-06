import React, { Fragment, useEffect } from 'react';
import { LightsChildrenError } from './caroumeshErrors';

type LightsProps = { children?: JSX.Element | JSX.Element[] };

export function Lights(props: LightsProps) {
  useEffect(() => {
    var children: JSX.Element[] = props.children as Array<JSX.Element>;
    if (!Array.isArray(children)) {
      children = [children];
    }

    children.forEach((value) => {
      if (!value.type) LightsChildrenError();

      switch (value.type) {
        case 'spotLight':
          break;
        case 'pointLight':
          break;
        case 'rectAreaLight':
          break;
        case 'hemisphereLight':
          break;
        case 'directionalLight':
          break;
        case 'ambientLight':
          break;
        default:
          LightsChildrenError();
      }
    });
  }, [props.children]);

  return <Fragment>{props.children}</Fragment>;
}
