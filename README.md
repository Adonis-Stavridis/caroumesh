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
  - [Scenes](#scenes)
    - [Optimizing scenes](#optimizing-scenes)
  - [Dimensions](#dimensions)
  - [Lights](#lights)
  - [Controls](#controls)
  - [Stats](#stats)
- [Upcoming releases](#upcoming-releases)
- [Contributing](#contributing)

## Installation

To install Caroumesh execute the following command in your React project:

```bash
# With npm
npm install caroumesh
# With yarn
yarn add caroumesh
```

## Getting started

Import the Caroumesh component and use it within your React components.

```tsx
import { Caroumesh } from 'caroumesh';

...

<Caroumesh scenes={['assets/StarDestroyer.gltf', 'assets/TieFighter.gltf']} />

...
```

<!-- TODO remove these links and replace them with storybook -->

You can also view this
[live example](https://adonis-stavridis.github.io/caroumesh-example) and a
[live demo](https://codesandbox.io/s/caroumesh-example-8ui0h).

You can use the `Left Arrow` and `Right Arrow` on the component (or your keyboard)
to rotate to the previous and next scene.

## Caroumesh component

### Overview

The Caroumesh component is the main and only component of this library (as of now).

```tsx
<Caroumesh />
```

It accepts the following props:

| Prop         | Description                              | Type                                                                                                         | Default value             |
| ------------ | ---------------------------------------- | ------------------------------------------------------------------------------------------------------------ | ------------------------- |
| `scenes`     | Scenes of the carousel                   | [`SceneObject[]`](https://github.com/Adonis-Stavridis/caroumesh/tree/main/src/components/Caroumesh.types.ts) | ❗️ Required               |
| `dimensions` | Fixed dimensions of the component        | [`Dimensions`](https://github.com/Adonis-Stavridis/caroumesh/tree/main/src/components/Caroumesh.types.ts)    | Takes all available space |
| `shadows`    | Render shadows                           | `boolean`                                                                                                    | `false`                   |
| `controls`   | Use orbits controls                      | `boolean`                                                                                                    | `false`                   |
| `lights`     | Control lights behavior                  | [`LightsOptions`](https://github.com/Adonis-Stavridis/caroumesh/tree/main/src/components/Caroumesh.types.ts) | `undefined`               |
| `stats`      | Show statistics of Caroumesh performance | `boolean`                                                                                                    | `undefined`               |
| `styles`     | Set of styles to customize               | [`Styles`](https://github.com/Adonis-Stavridis/caroumesh/tree/main/src/components/Caroumesh.types.ts)        | `undefined`               |
| `className`  | Custom classname                         | `string`                                                                                                     | `undefined`               |

### Scenes

You can add a scene by only specifying its' path using a string.

```tsx
<Caroumesh scenes={['assets/StarDestroyer.gltf', 'assets/TieFighter.gltf']} />
```

Otherwise, you might want to modify the scene first. You can import it by passing it as a [`SceneObject`](https://github.com/Adonis-Stavridis/caroumesh/tree/main/src/lib/components/Scene/Scene.types.ts). You can use both types in the same array.

```tsx
<Caroumesh
  scenes={[
    {
      src: 'assets/StarDestroyer.gltf',
      scale: 0.5,
      position: new Vector3(0.5, 0.25, -0.5),
    },
    'assets/TieFighter.gltf',
  ]}
/>
```

It accepts the following props:

```ts
src: string; // source gltf / glb file
shadows?: boolean; // enable shadows on model
offset?: Vector3; // offset model
scale?: number | Vector3; // scale model
rotation?: Vector3; // rotate model
```

You can add as many scenes as you want inside of Caroumesh, just keep in mind that
adding an excessive amount of scenes might affect performance. You can use the `stats`
prop to evaluate the FPS of the component (cf [#stats](#stats))

#### Optimizing scenes

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

### Dimensions

By default, the component will take all available space of the parent's space.
You can manually set the dimensions using the `dimensions` prop.

```tsx
<Caroumesh
  ...
  dimensions={[750, 500]}
  ...
/>
```

### Lights

The component comes by default with a three point light setup.

You can modify this setup by changing the props of the lights using the
`lights: { keyLight, fillLight, backLight }` prop.

You can also display the lights' gizmos (visual helpers to see what area is affected by a light)
using the `lights: { helpers }` prop.

If you want to setup your own light setup you can use the `lights: { customLights }` prop.

```tsx
<Caroumesh
  ...
  lights={{
    customLights: <spotLight position={new Vector3(4, 2, 4)} />
  }}
  ...
/>
```

This prop accepts a `ReactNode` of
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
these components.

### Controls

You can enable enhanced controls over the scenes using the `controls` prop.
You can use the following key-binds on your mouse and keyboard to control the scene:

| Key-bind                          | Action     |
| --------------------------------- | ---------- |
| Mouse Left (Hold)                 | Rotate     |
| Shift or Ctrl + Mouse Left (Hold) | Pan        |
| Scroll wheel                      | Zoom       |
| Space                             | Reset view |

The view resets every time you switch to a new scene.

### Stats

> **_"If it works on my computer, then it's all good!"_**

While developing, you can use the `stats` prop to evaluate performance
and check how adding models or lights may affect your FPS.

> ⚠️ It's suggested to enable this prop only when developing, for
> debugging purposes, and disable it when deploying to production.
>
> ℹ️ The FPS of the component depends on the workstation it is being run on.
> So performance will vary between different computers.
> Also, FPS might be lower when running on a phone.

In general, good performance would be an average of ~60 FPS, when switching scenes
and also when holding idle on scenes.

If you have more than 60 FPS, then you probably have a "better than average" workstation,
so don't be fooled into overloaded the scenes with high-poly meshes, lots of lights, and effects.
You might be able to run it, but maybe not the average user.

If you have anything less than 50-60 FPS, then you either:

- have scenes that are very heavy (lots of polygons or lights usually)
  - [Optimizing your scenes](#optimizing-scenes) might help
  - Use a 3D editing software (such as [Blender](https://www.blender.com) 🧡) to simplify mesh and remove any components
    that could be heavy on the load (lights for example)
- have added too many scenes into the Caroumesh
  - same suggestions as previous bullet points
  - Remove any scene you deem optional
  - Remove any scene that could be heavy
- are rerendering the Caroumesh several times
  - the props you are passing could be changing
  - memoize props passed to Caroumesh with `React.useMemo`
  - fix the parent components of Caroumesh from updating too much
  - memoize your Caroumesh component with `React.memo` so that it only rerenders when necessary
- are using a browser with locked FPS
  - not sure if you can change this, you should look it up
- Caroumesh is buggy or is built poorly 😳
  - [create an issue](https://github.com/Adonis-Stavridis/caroumesh/issues/new)
    about your use case
  - [create a Pull Request](https://github.com/Adonis-Stavridis/caroumesh/compare) to fix this
    darn thing
- if you are certain that all the above are not the reason of poor performance, and FPS is so
  low, Caroumesh is barely useable, then you probably own a "potato computer" 🥔
  - getting a better computer 🤷

## Upcoming releases

The next releases may present the following features:

- Display visual indicator of position of current scene and the surrounding ones.
- Display textual information for each model (title and description)

For any feature requests,
[create an issue](https://github.com/Adonis-Stavridis/caroumesh/issues/new) or feel free to
[create your own Pull Request](https://github.com/Adonis-Stavridis/caroumesh/compare) and
contribute to the project! :trollface:

## Contributing

1. Fork the repository
2. Setup it up by running: `yarn`
3. Create a new branch
4. Push your changes
5. Create a Pull Request
6. Wait for me to give it a review

Any feedback is welcome through
[issues](https://github.com/Adonis-Stavridis/caroumesh/issues) as well. 🙏

---

Thanks to the amazing teams and contributors of
[three.js](https://github.com/mrdoob/three.js) and
[react-three-fiber](https://github.com/pmndrs/react-three-fiber), for building such awesome stuff!

But also, **Thank You** for using `Caroumesh`! ❤️
