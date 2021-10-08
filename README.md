# Caroumesh <!-- omit in toc -->

![](https://img.shields.io/npm/v/caroumesh)
![](https://img.shields.io/npm/dt/caroumesh)
![](https://img.shields.io/github/workflow/status/adonis-stavridis/caroumesh/CI)
![](https://img.shields.io/github/issues/adonis-stavridis/caroumesh)
![](https://img.shields.io/npm/l/caroumesh)

Caroumesh is a React component to display your 3d models in a Carousel-like
fashion inside your application, using
[three.js](https://github.com/mrdoob/three.js) and
[react-three-fiber](https://github.com/pmndrs/react-three-fiber).

![](https://i.imgur.com/eeA5TUl.gif)

## Table of contents <!-- omit in toc -->

- [Installation](#installation)
- [Getting started](#getting-started)
- [Components](#components)
  - [Caroumesh](#caroumesh)
  - [Model](#model)
  - [Lights](#lights)
  - [CaroumeshContainer](#caroumeshcontainer)

## Installation

To install Caroumesh execute the following command in your React project:

```bash
npm install caroumesh
```

The package and all of its dependencies should be installed.

## Getting started

Import the React components from the package.

```tsx
import { Caroumesh, Model } from 'caroumesh';
```

Add them to your render function inside your application.

```html
<Caroumesh>
  <Model src="Star destroyer.gltf" />
</Caroumesh>
```

<!-- TODO: add live example and github to caroumesh-example -->

## Components

### Caroumesh

The Caroumesh component is the parent component that sets up the canvas on which
to display the meshes.

```html
<Caroumesh> ... </Caroumesh>
```

It accepts the following props:

```ts
shadows?: boolean; // enable shadows
radius?: number; // radius of carousel (brings meshes closer / further together)
effects?: boolean; // enables SSAO and HueSaturation (negatively affects FPS)
stats?: boolean; // display FPS (useful for debugging)
animationTime?: number; // transition animation time in ms (1s = 1000ms)
theme?: string; // color theme of controls (left / right arrows)
width?: string; // width CSS property
height?: string; // height CSS property
backgroundColor?: string; // background color
border?: string; // border CSS property
borderRadius?: string; // border-radius CSS property
style?: React.CSSProperties; // any extra CSS properties
```

The component will take the entire space of the parent by default. Also while
developping your application, you can use the `stats` prop to evaluate
performance and see how adding models or lights may affect your FPS.

### Model

The Model component will load a mesh / model onto the Caroumesh component.

```html
<Caroumesh>
  <Model> ... </Model>
</Caroumesh>
```

It accepts the following props:

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

**Important**: The `src` prop string should be the relative path to the gltf or
glb file of your model. It is recommended you compress your models into glb
files with draco compression, to reduce load, with the following command:

```bash
npx gltf-pipeline -i model.gltf -o model.glb -d
```

You can use the `offset`, `scale` and `rotation` props in order to place your
model wherever you like.

**Important**: Use `offset` prop to offset model instead of `position` prop.
The latter is set by this package and setting it manually may lead to unwanted
results.

### Lights

The Caroumesh component comes by default with a three point light setup, with
casting shadows to illuminate your models. If you want to setup your own light
setup you can use the Lights component.

```html
<Caroumesh>
  <Lights> ... </Lights>
</Caroumesh>
```

Inside of this component you have to add
[react-three-fiber](https://github.com/pmndrs/react-three-fiber) light
components. These are all the possible light components you can use:

```html
<spotLight />
<pointLight />
<rectAreaLight />
<hemisphereLight />
<directionalLight />
<ambientLight />
```

You can find the
[documentation](https://threejs.org/docs/index.html?q=light#api/en/lights/Light)
of [three.js](https://github.com/mrdoob/three.js), for more information about
what props these components use.

You can add as many lights as you want, though, again, keep in mind more lights
leads to heavier load, thus to worse performance.

### CaroumeshContainer

The CaroumeshContainer component is useful for catching any errors that could
occur when building your application. It is by no means necessary, but can come
in handy during development. You can wrap your Caroumesh component with it.

```html
<CaroumeshContainer>
  <Caroumesh> ... </Caroumesh>
</CaroumeshContainer>
```

It will display what the error that occurred where your Caroumesh should be
located inside your app (not inside the console) and possibly the cause and
potential fix for that error.

If you are using
[create-react-app](https://github.com/facebook/create-react-app), you don't have
to use this component because an integrated error logger is already set up.

<!-- TODO: complete example -->

---

Thank you for using Caroumesh ! ❤️
