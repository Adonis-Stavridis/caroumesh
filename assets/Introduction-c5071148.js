import{j as e}from"./jsx-runtime-a51fe075.js";import{M as s,d as i}from"./index-f602aad0.js";import{u as a}from"./index-9f0ec060.js";import"./index-6bd1afc7.js";import"./_commonjsHelpers-de833af9.js";import"./iframe-e42dfce6.js";import"../sb-preview/runtime.js";import"./index-d475d2ea.js";import"./index-d37d4223.js";import"./inheritsLoose-50ceb98b.js";import"./index-82885479.js";import"./index-356e4a49.js";const r=`# Caroumesh <!-- omit in toc -->

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

\`\`\`bash
# With npm
npm install caroumesh
# With yarn
yarn add caroumesh
\`\`\`

## Getting started

Import the Caroumesh component and use it within your React components.

\`\`\`tsx
import { Caroumesh } from 'caroumesh';

...

<Caroumesh scenes={['assets/StarDestroyer.gltf', 'assets/TieFighter.gltf']} />

...
\`\`\`

You can also view and play around with Caroumesh using this Storybook:

<a href='https://adonis-stavridis.github.io/caroumesh'>
  <img alt="Storybook" src="https://img.shields.io/badge/Storybook-white?style=for-the-badge&logo=storybook">
</a>

## Caroumesh component

### Overview

The Caroumesh component is the main and only component of this library.

\`\`\`tsx
<Caroumesh />
\`\`\`

It accepts the following props:

| Prop            | Description                                       | Type                                                                                                         | Default value             |
| --------------- | ------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ | ------------------------- |
| \`scenes\`        | Scenes of the carousel                            | [\`SceneObject[]\`](https://github.com/Adonis-Stavridis/caroumesh/tree/main/src/components/Caroumesh.types.ts) | ❗️ Required               |
| \`dimensions\`    | Fixed dimensions of the component                 | [\`Dimensions\`](https://github.com/Adonis-Stavridis/caroumesh/tree/main/src/components/Caroumesh.types.ts)    | Takes all available space |
| \`shadows\`       | Render shadows                                    | \`boolean\`                                                                                                    | \`false\`                   |
| \`controls\`      | Use orbits controls                               | \`boolean\`                                                                                                    | \`false\`                   |
| \`lights\`        | Control lights behavior                           | [\`LightsOptions\`](https://github.com/Adonis-Stavridis/caroumesh/tree/main/src/components/Caroumesh.types.ts) | \`undefined\`               |
| \`radius\`        | Control how far apart scenes are from one another | \`number\`                                                                                                     | \`10\`                      |
| \`animationTime\` | Time to transition to new scene, in ms            | \`number\`                                                                                                     | \`1000\`                    |
| \`stats\`         | Show statistics of Caroumesh performance          | \`boolean\`                                                                                                    | \`undefined\`               |
| \`styles\`        | Set of styles to customize                        | [\`Styles\`](https://github.com/Adonis-Stavridis/caroumesh/tree/main/src/components/Caroumesh.types.ts)        | \`undefined\`               |
| \`className\`     | Custom classname                                  | \`string\`                                                                                                     | \`undefined\`               |

### Scenes

You can add a scene by only specifying its path using a string.

\`\`\`tsx
<Caroumesh scenes={['assets/StarDestroyer.gltf', 'assets/TieFighter.gltf']} />
\`\`\`

Otherwise, you might want to modify the scene first. You can import it by passing it as a [\`SceneObject\`](https://github.com/Adonis-Stavridis/caroumesh/tree/main/src/lib/components/Scene/Scene.types.ts). You can use both types in the same array.

\`\`\`tsx
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
\`\`\`

The [\`SceneObject\`](https://github.com/Adonis-Stavridis/caroumesh/tree/main/src/lib/components/Scene/Scene.types.ts) accepts the following props:

\`\`\`ts
{
  /** Source path to scene file */
  src: string;
  /** Cast and receive shadows */
  shadows?: boolean;
  /** Control intensity of lights in scene */
  lightIntensity?: number;
  /** Rotation speed of scene: set this to \`0\` to disable rotation */
  rotationSpeed?: number;
} & {
  position?: Vector3;
  up?: Vector3;
  scale?: number | Vector3;
  rotation?: Euler;
  matrix?: Matrix4;
  quaternion?: Quaternion;
}
\`\`\`

> ⚠️ Adding too many scenes might affect performance. You can use the
> \`stats\` prop to analyze impact on the component's FPS (cf [#stats](#stats))

#### Optimizing scenes

Generally, 3D scenes and meshes are can be quite heavy, so to reduce load
as much as possible it is recommended you compress your models into glb
files with draco compression. You can run the following command to compress
each gltf/glb file you have.

\`\`\`bash
yarn scene:optimize model.gltf
\`\`\`

> ℹ️ This creates a new gltf file at the same location as the input file
> using [the Draco compression library](https://github.com/google/draco)

If you want more customization over the arguments, use \`yarn scene\`
(see [gltf-pipeline CLI documentation](https://github.com/CesiumGS/gltf-pipeline#using-gltf-pipeline-as-a-command-line-tool)
to learn more about the arguments you can use). For example:

\`\`\`bash
yarn scene -i model.gltf -b
\`\`\`

### Dimensions

By default, the component will take all available space of the parent's space.
You can manually set the dimensions using the \`dimensions\` prop.

\`\`\`tsx
<Caroumesh
  ...
  dimensions={[750, 500]}
  ...
/>
\`\`\`

### Lights

The component comes by default with a three point light setup.

You can modify this setup by changing the props of the lights using the
\`lights: { keyLight, fillLight, backLight }\` prop.

You can also display the lights' gizmos (visual helpers to see what area is affected by a light)
using the \`lights: { helpers }\` prop.

If you want to setup your own light setup you can use the \`lights: { customLights }\` prop.

\`\`\`tsx
<Caroumesh
  ...
  lights={{
    customLights: <spotLight position={new Vector3(4, 2, 4)} />
  }}
  ...
/>
\`\`\`

This prop accepts
[react-three-fiber light components](https://threejs.org/docs/?q=light#api/en/lights/AmbientLight).
These are all the possible light components you can use:

\`\`\`html
<ambientLight />
<directionalLight />
<hemisphereLight />
<pointLight />
<rectAreaLight />
<spotLight />
\`\`\`

### Controls

You can enable enhanced controls over the scenes using the \`controls\` prop.
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

While developing, you can use the \`stats\` prop to evaluate performance
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
  - Use a 3D editing software (such as [Blender](https://www.blender.org) 🧡) to simplify mesh and remove any components
    that could be heavy on the load (lights for example)
- have added too many scenes into the Caroumesh
  - same suggestions as previous bullet points
  - Remove any scene you deem optional
  - Remove any scene that could be heavy
- are rerendering the Caroumesh several times
  - the props you are passing could be changing
  - memoize props passed to Caroumesh with \`React.useMemo\`
  - fix the parent components of Caroumesh from updating too much
  - memoize your Caroumesh component with \`React.memo\` so that it only rerenders when necessary
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
2. Setup it up by running \`yarn\`
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

But also, **Thank You** for using \`Caroumesh\`! ❤️
`;function o(n){return e.jsxs(e.Fragment,{children:[e.jsx(s,{title:"Introduction"}),`
`,e.jsx(i,{children:r})]})}function v(n={}){const{wrapper:t}=Object.assign({},a(),n.components);return t?e.jsx(t,Object.assign({},n,{children:e.jsx(o,n)})):o()}export{v as default};
//# sourceMappingURL=Introduction-c5071148.js.map
