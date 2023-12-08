import { Bloom } from '@react-three/postprocessing';
import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { Caroumesh } from 'caroumesh';

const meta: Meta<typeof Caroumesh> = {
  title: 'Caroumesh',
  component: Caroumesh,
  //👇 Enables auto-generated documentation for the component story
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Caroumesh>;

const baseArgs = {
  scenes: [
    {
      src: 'assets/StarDestroyer.gltf',
      scale: 0.08,
      lightIntensity: 0.005,
    },
    { src: 'assets/TieFighter.gltf', scale: 4, rotationSpeed: 0.25 },
  ],
  dimensions: {
    height: 500,
  },
};

export const Basic: Story = {
  args: {
    ...baseArgs,
    controls: true,
    shadows: true,
    effects: {
      children: [<Bloom key="bloom" intensity={1.0} />],
    },
  },
};

export const Controls: Story = {
  args: {
    ...baseArgs,
    controls: true,
  },
};

export const Shadows: Story = {
  args: {
    ...baseArgs,
    shadows: true,
  },
};

export const Lights: Story = {
  args: {
    ...baseArgs,
    lights: {
      keyLight: {
        color: '#b947ff',
      },
      fillLight: {
        color: '#47ff67',
      },
      backLight: {
        color: '#ffc647',
      },
      helpers: true,
    },
  },
};

export const Effects: Story = {
  args: {
    ...baseArgs,
    effects: {
      children: [<Bloom key="bloom" intensity={2.0} />],
    },
  },
};

export const Styles: Story = {
  args: {
    ...baseArgs,
    styles: {
      colorTheme: 'tomato',
      hasBorder: true,
      borderColor: 'dodgerblue',
      isBorderRounded: true,
      backgroundColor: 'lightgrey',
    },
  },
};
