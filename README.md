# Caroumesh <!-- omit in toc -->

![](https://img.shields.io/npm/v/caroumesh)
![](https://img.shields.io/npm/dt/caroumesh)
![](https://img.shields.io/npm/l/caroumesh)
![](https://img.shields.io/github/issues/adonis-stavridis/caroumesh)
![](https://img.shields.io/github/issues-pr/adonis-stavridis/caroumesh)
![](https://img.shields.io/github/actions/workflow/status/adonis-stavridis/caroumesh/CI.yaml)
![](https://img.shields.io/github/deployments/adonis-stavridis/caroumesh/github-pages?logo=storybook&label=Storybook&labelColor=white&color=%23ff4785)

Caroumesh is a React component to display your 3D models in a Carousel-like
fashion inside your application, using
[three.js](https://github.com/mrdoob/three.js) and
[react-three-fiber](https://github.com/pmndrs/react-three-fiber).

![](src/assets/Caroumesh.gif)

---

## Table of contents <!-- omit in toc -->

- [Installation](#installation)
- [Getting started](#getting-started)
- [Caroumesh component](#caroumesh-component)
  - [Overview](#overview)
  - [Scenes](#scenes)
  - [Dimensions](#dimensions)
  - [Shadows](#shadows)
  - [Controls](#controls)
  - [Lights](#lights)
  - [Effects](#effects)
  - [Radius](#radius)
  - [Animation Time](#animation-time)
  - [Stats](#stats)
  - [Styles](#styles)
  - [ClassName](#classname)
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

You can also view and play around with Caroumesh using this Storybook:

<a href='https://adonis-stavridis.github.io/caroumesh'>
  <img alt="Storybook" src="https://img.shields.io/badge/Storybook-white?style=for-the-badge&logo=storybook">
</a>

## Caroumesh component

### Overview

The Caroumesh component is the main and only component of this library.

```tsx
<Caroumesh />
```

It accepts the following props:

| Prop                               | Description                                       | Type                                                                                                                    | Default value             |
| ---------------------------------- | ------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- | ------------------------- |
| [`scenes`](#scenes)                | Scenes of the carousel                            | [`SceneObject`](https://github.com/Adonis-Stavridis/caroumesh/tree/main/src/components/Caroumesh/Caroumesh.types.ts)[]  | ❗️ Required               |
| [`dimensions`](#dimensions)        | Fixed dimensions of the component                 | [`Dimensions`](https://github.com/Adonis-Stavridis/caroumesh/tree/main/src/components/Caroumesh/Caroumesh.types.ts)     | Takes all available space |
| [`shadows`](#shadows)              | Render shadows                                    | `boolean`                                                                                                               | `false`                   |
| [`controls`](#controls)            | Use orbits controls                               | `boolean`                                                                                                               | `false`                   |
| [`lights`](#lights)                | Control lights behavior                           | [`LightsOptions`](https://github.com/Adonis-Stavridis/caroumesh/tree/main/src/components/Caroumesh/Caroumesh.types.ts)  | `undefined`               |
| [`effects`](#effects)              | Add post-processing effects                       | [`EffectsOptions`](https://github.com/Adonis-Stavridis/caroumesh/tree/main/src/components/Caroumesh/Caroumesh.types.ts) | `undefined`               |
| [`radius`](#radius)                | Control how far apart scenes are from one another | `number`                                                                                                                | `10`                      |
| [`animationTime`](#animation-time) | Time to transition to new scene, in ms            | `number`                                                                                                                | `1000`                    |
| [`stats`](#stats)                  | Show statistics of Caroumesh performance          | `boolean`                                                                                                               | `undefined`               |
| [`styles`](#styles)                | Set of styles to customize                        | [`Styles`](https://github.com/Adonis-Stavridis/caroumesh/tree/main/src/components/Caroumesh/Caroumesh.types.ts)         | `undefined`               |
| [`className`](#classname)          | Custom classname                                  | `string`                                                                                                                | `undefined`               |

### Scenes

You can add a scene by only specifying its path using a string.

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

The [`SceneObject`](https://github.com/Adonis-Stavridis/caroumesh/tree/main/src/lib/components/Scene/Scene.types.ts) accepts the following props:

```ts
{
  /** Source path to scene file */
  src: string;
  /** Cast and receive shadows */
  shadows?: boolean;
  /** Control intensity of lights in scene */
  lightIntensity?: number;
  /** Rotation speed of scene: set to `0` to disable rotation */
  rotationSpeed?: number;
} & {
  position?: Vector3;
  up?: Vector3;
  scale?: number | Vector3;
  rotation?: Euler;
  matrix?: Matrix4;
  quaternion?: Quaternion;
}
```

> ⚠️ Adding too many scenes might affect performance. You can use the
> `stats` prop to analyze impact on the component's FPS (cf [#stats](#stats))

#### Optimizing scenes <!-- omit in toc -->

Generally, 3D scenes and meshes are can be quite heavy, so to reduce load
as much as possible it is recommended you compress your models into glb
files with draco compression. You can run the following command to compress
each gltf/glb file you have.

```bash
yarn scene:optimize model.gltf
```

> ℹ️ This creates a new gltf file at the same location as the input file
> using [the Draco compression library](https://github.com/google/draco)

If you want more customization over the arguments, use `yarn scene`
(see [gltf-pipeline CLI documentation](https://github.com/CesiumGS/gltf-pipeline#using-gltf-pipeline-as-a-command-line-tool)
to learn more about the arguments you can use). For example:

```bash
yarn scene -i model.gltf -b
```

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

### Shadows

By default, `shadows` are disabled. When enabled, built-in lights will emit shadows on scenes that cast and receive them.

```tsx
<Caroumesh
  ...
  shadows
  ...
/>
```

### Controls

You can enable enhanced controls over the scenes using the `controls` prop.

```tsx
<Caroumesh
  ...
  controls
  ...
/>
```

You can use the following key-binds on your mouse and keyboard to control the scene:

| Key-bind                          | Action     |
| --------------------------------- | ---------- |
| Mouse Left (Hold)                 | Rotate     |
| Shift or Ctrl + Mouse Left (Hold) | Pan        |
| Scroll wheel                      | Zoom       |
| Space                             | Reset view |

The view resets every time you switch to a new scene.

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

This prop accepts
[react-three-fiber light components](https://threejs.org/docs/?q=light#api/en/lights/AmbientLight).
These are all the possible light components you can use:

```html
<ambientLight />
<directionalLight />
<hemisphereLight />
<pointLight />
<rectAreaLight />
<spotLight />
```

### Effects

You can add postprocessing `effects` to your Caroumesh rendering, based on the [@react-three/postprocessing](https://docs.pmnd.rs/react-postprocessing) library.
The list of effects components are listed [here](https://docs.pmnd.rs/react-postprocessing/effects).

> ⚠️ Effects can have a great impact on performance. Use with caution!

```tsx
import { Bloom } from '@react-three/postprocessing';
...
<Caroumesh
  ...
  effects={{
    children: [<Bloom key="bloom" intensity={0.1} />],
    ...
  }}
  ...
/>
```

### Radius

The `radius` prop controls the radius of the carousel-circle upon which the scenes are placed,
thus the distance between the scenes. By default, the radius is set to 10.

```tsx
<Caroumesh
  ...
  radius={6}
  ...
/>
```

### Animation Time

You can change the time to transition between the different scenes using the `animationTime` prop.
The value is set in milliseconds (ms), and by default it is set to 1000ms.

```tsx
<Caroumesh
  ...
  animationTime={500}
  ...
/>
```

### Stats

> **_"If it works on my computer, then it's all good!"_**

While developing, you can use the `stats` prop to evaluate performance
and check how adding models or lights may affect your FPS.

```tsx
<Caroumesh
  ...
  stats
  ...
/>
```

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

<details>
<summary>If you have anything less than 50-60 FPS, then you might (click me👇)</summary>

- have scenes that are very heavy (lots of polygons or lights usually)
  - [Optimizing your scenes](#optimizing-scenes) might help
  - Use a 3D editing software (such as [Blender](https://www.blender.org) 🧡) to simplify mesh and remove any components
    that could be heavy on the load (lights for example)
- have added too many scenes into the Caroumesh
  - same suggestions as previous bullet points
  - Remove any scene you deem optional
  - Remove any scene that could be heavy
- have added effects which have a big impact on performance
  - you can remove them if they're not strictly necessary
  - reducing
- are re-rendering the Caroumesh several times
  - the props you are passing could be changing
  - memoize props passed to Caroumesh with [`React.useMemo`](https://react.dev/reference/react/useMemo)
  - fix the parent components of Caroumesh from updating too much
- are using a browser with locked FPS
  - not sure if you can change this, you should look it up
- Caroumesh is buggy or is built poorly 😳
  - [create an issue](https://github.com/Adonis-Stavridis/caroumesh/issues/new)
    about your use case
  - [create a pull request](https://github.com/Adonis-Stavridis/caroumesh/compare) to fix this
    darn thing
- if you are certain that all the above are not the reason of poor performance, and FPS is so
  low, Caroumesh is barely useable, then you probably own a "potato computer" 🥔
  - getting a better computer 🤷

</details>

### Styles

The `styles` prop is a set of predefined styling options that you can use to
customize the look of Caroumesh. You can directly control the following CSS properties:

```tsx
{
  colorTheme?: CSSProperties['color'];
  backgroundColor?: CSSProperties['color'];
  hasBorder?: boolean;
  borderColor?: CSSProperties['borderColor'];
  isBorderRounded?: boolean;
}
```

```tsx
<Caroumesh
  ...
  styles={{
    hasBorder: true,
    isBorderRounded: true,
  }}
  ...
/>
```

### ClassName

This `className` prop allows you to add a custom classname to the Caroumesh component,
so that you can style your component however you want.

```tsx
<Caroumesh
  ...
  className="my-custom-classname"
  ...
/>
```

## Upcoming releases

The next releases may present the following features:

- Display visual indicator of position of current scene and the surrounding ones.
- Display textual information for each model (title and description)

For any feature requests,
[create an issue](https://github.com/Adonis-Stavridis/caroumesh/issues/new) or feel free to
[create a pull request](https://github.com/Adonis-Stavridis/caroumesh/compare) and
contribute to the project! :trollface:

## Contributing

1. Fork the repository
2. Setup it up by running `yarn`
3. Create a new branch
4. Push your changes
5. Create a pull request
6. Wait for a review

Any feedback is welcome through
[issues](https://github.com/Adonis-Stavridis/caroumesh/issues) as well. 🙏

---

Thanks to the amazing teams and contributors of
[three.js](https://github.com/mrdoob/three.js) and
[react-three-fiber](https://github.com/pmndrs/react-three-fiber), for building such awesome stuff!

But also, **Thank You** for using `Caroumesh`! ❤️
