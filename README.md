# Caroumesh <!-- omit in toc -->

![](https://img.shields.io/npm/v/caroumesh)
![](https://img.shields.io/npm/dt/caroumesh)
![](https://img.shields.io/github/workflow/status/adonis-stavridis/caroumesh/CI)
![](https://img.shields.io/github/issues/adonis-stavridis/caroumesh)
![](https://img.shields.io/npm/l/caroumesh)

Caroumesh is a React component to display your 3d models in a Carousel-like
fashion inside your application.

[](https://imgur.com/eeA5TUl)

## Table of contents <!-- omit in toc -->

- [Installation](#installation)
- [Getting started](#getting-started)
  - [Caroumesh component](#caroumesh-component)
  - [Model component](#model-component)

## Installation

To install Caroumesh execute the following command in your React project:

```bash
npm install caroumesh
```

The package and all of its dependencies should be installed.

## Getting started

The simplest way to create a Caroumesh component is the following:

```html
<Caroumesh>
  <Model src="Star destroyer.gltf" />
</Caroumesh>
```

<!-- TODO: add live example and github to caroumesh-example -->

### Caroumesh component

The Caroumesh component is the parent component that sets up the canvas on which
to display the meshes. It accepts the following props:

```ts
shadows?: boolean; // enable shadows
radius?: number; // radius of carousel (brings meshes closer / further together)
effects?: boolean; // enables SSAO and HueSaturation (negatively affects FPS)
stats?: boolean; // display FPS (useful for debugging)
animationTime?: number; // transition animation time in ms (1s = 1000ms)
theme?: string; // color theme of controls (left / right arrows)
width?: number; // width CSS property in px
height?: number; // height CSS property in px
backgroundColor?: string; // background color
border?: string; // border CSS property
borderRadius?: string; // border-radius CSS property
style?: React.CSSProperties; // any extra CSS properties
```

The component will take the entire space of the parent by default.

### Model component

The Model component will load a mesh / model onto the Caroumesh component. It
accepts the following props:

```ts
src: string; // source gltf / glb file
shadows?: boolean; // enable shadows on model
offset?: Vector3; // offset model
scale?: number | Vector3; // scale model
rotation?: Vector3; // rotate model
```

You can add as many models as you like inside of a Caroumesh, just keep in mind
that it does affect performance. It is also possible to display a single model,
or none at all.

_**Important**: Use `offset` prop to offset model instead of `position` prop. The
latter is set by this package and setting it manually may lead to unwanted
results._
