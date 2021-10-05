import React, { useEffect } from 'react';

type LightsProps = { children?: JSX.Element[] };

export function Lights(props: LightsProps) {
  useEffect(() => {
    var children: JSX.Element[] = props.children ?? [];
    if (!Array.isArray(children)) {
      children = [children];
    }

    children.forEach((element) => {
      console.log(element.type);
    });
  }, []);

  return <React.Fragment>{props.children}</React.Fragment>;
}
