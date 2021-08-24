import React, { Component } from 'react';

export type CaroumeshProps = {
  name: string
};

export class Caroumesh extends Component<CaroumeshProps> {
  render() {
    return <div>Hello {this.props.name}!</div>;
  }
}
