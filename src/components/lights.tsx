import React, { Fragment, useEffect } from 'react';

type LightsProps = { children?: JSX.Element | JSX.Element[] };

export function Lights(props: LightsProps) {
  useEffect(() => {
    var children: JSX.Element[] = props.children as Array<JSX.Element>;
    if (!Array.isArray(children)) {
      children = [children];
    }

    const error = () => {
      throw new Error(
        'Cause:\n<Lights/> only accepts <spotLight/>, <pointLight/>, <rectAreaLight/>, <hemisphereLight/>, <directionalLight/> and <ambientLight/> components !\nFix:\nRemove any other React components or text than the mentionned inside of the <Lights/> component.'
      );
    };

    children.forEach((value) => {
      if (!value.type) error();

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
          error();
      }
    });
  }, []);

  return <Fragment>{props.children}</Fragment>;
}
