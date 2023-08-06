# Caroumesh <!-- omit in toc -->

![](https://img.shields.io/npm/v/caroumesh)
![](https://img.shields.io/npm/dt/caroumesh)
![](https://img.shields.io/github/workflow/status/adonis-stavridis/caroumesh/CI)
![](https://img.shields.io/github/issues/adonis-stavridis/caroumesh)
![](https://img.shields.io/npm/l/caroumesh)

Caroumesh is a React component to display your 3D models in a Carousel-like
fashion inside your application, using
[three.js](https://github.com/mrdoob/three.js) and
[react-three-fiber](https://github.com/pmndrs/react-three-fiber).

![](https://i.imgur.com/eeA5TUl.gif)

---

## Table of contents <!-- omit in toc -->

- [Installation](#installation)
- [Getting started](#getting-started)
- [Caroumesh component](#caroumesh-component)
  - [Overview](#overview)
  - [Some details](#some-details)
  - [Interaction](#interaction)
  - [Model](#model)
  - [Lights](#lights)
- [Upcoming releases](#upcoming-releases)
- [Links](#links)

## Installation

To install Caroumesh execute the following command in your React project:

```bash
# With npm
npm install caroumesh
# With yarn
yarn add caroumesh
```

## Getting started

Import the React components from the package.

```tsx
import { Caroumesh } from 'caroumesh';
```

Add them to your render function inside your application.

```tsx
<Caroumesh scenes={['assets/StarDestroyer.gltf', 'assets/TieFighter.gltf']} />
```

You can also view this
[live example](https://adonis-stavridis.github.io/caroumesh-example) and a
[live demo](https://codesandbox.io/s/caroumesh-example-8ui0h).

## Caroumesh component

### Overview

The Caroumesh component is the main and only component of this library (as of now).

```tsx
<Caroumesh />
```

It accepts the following props:

| Prop           | Description                       | Type                                                                                                         | Default value             |
| -------------- | --------------------------------- | ------------------------------------------------------------------------------------------------------------ | ------------------------- |
| `scenes`       | Scenes of the carousel            | [`SceneObject[]`](https://github.com/Adonis-Stavridis/caroumesh/tree/main/src/components/Caroumesh.types.ts) | ❗️ Required               |
| `dimensions`   | Fixed dimensions of the component | [`Dimensions`](https://github.com/Adonis-Stavridis/caroumesh/tree/main/src/components/Caroumesh.types.ts)    | Takes all available space |
| `shadows`      | Render shadows                    | `boolean`                                                                                                    | `false`                   |
| `controls`     | Use orbits controls               | `boolean`                                                                                                    | `false`                   |
| `lights`       | Control lights behavior           | [`LightsOptions`](https://github.com/Adonis-Stavridis/caroumesh/tree/main/src/components/Caroumesh.types.ts) | `undefined`               |
| `debugOptions` | Options to help with debugging    | [`DebugOptions`](https://github.com/Adonis-Stavridis/caroumesh/tree/main/src/components/Caroumesh.types.ts)  | `undefined`               |
| `styles`       | Set of styles to customize        | [`Styles`](https://github.com/Adonis-Stavridis/caroumesh/tree/main/src/components/Caroumesh.types.ts)        | `undefined`               |
| `className`    | Custom classname                  | `string`                                                                                                     | `undefined`               |

### Some details

The component will take the entire space of the parent by default. Also while
developping your application, you can use the `stats` prop to evaluate
performance and see how adding models or lights may affect your FPS.

### Interaction

The `Left Arrow` and `Right Arrow` keybinds can be used to rotate to the
previous or next scene inside the Caroumesh.

Also, if you have set the `controls` prop, you can use the following key-binds on your
mouse and keyboard to control the scene:

| Key-bind                          | Action     |
| --------------------------------- | ---------- |
| Mouse Left (Hold)                 | Rotate     |
| Shift or Ctrl + Mouse Left (Hold) | Pan        |
| Scroll wheel                      | Zoom       |
| Space                             | Reset view |

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
[react-three-fiber](https://threejs.org/docs/#api/en/lights/AmbientLight) light
components. These are all the possible light components you can use:

```html
<ambientLight />
<directionalLight />
<hemisphereLight />
<pointLight />
<rectAreaLight />
<spotLight />
```

You can find the
[documentation](https://threejs.org/docs/index.html?q=light#api/en/lights/Light)
of [three.js](https://github.com/mrdoob/three.js), for more information about
what props these components use.

## Upcoming releases

The next releases may present the following features:

- Display textual information for each model (title and description)

For any feature requests, create an issue or feel free to create your own PR and contribute to the project! :trollface:

## Links

- [Caroumesh npm website](https://www.npmjs.com/package/caroumesh)
- [Caroumesh live example](https://adonis-stavridis.github.io/caroumesh-example)
- [Caroumesh live demo](https://codesandbox.io/s/caroumesh-example-kp2tr)
- [three.js](https://github.com/mrdoob/three.js)
- [react-three-fiber](https://github.com/pmndrs/react-three-fiber)

---

Thank you for using `Caroumesh`! ❤️
