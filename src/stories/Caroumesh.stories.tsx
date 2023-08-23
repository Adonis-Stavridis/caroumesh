import type { Meta, StoryObj } from '@storybook/react';

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
    { src: 'assets/TieFighter.gltf', scale: 4 },
  ],
  dimensions: {
    height: 500,
  },
};

export const Basic: Story = {
  args: {
    ...baseArgs,
  },
};

export const Shadows: Story = {
  args: {
    ...baseArgs,
    shadows: true,
  },
};

export const Controls: Story = {
  args: {
    ...baseArgs,
    controls: true,
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
    },
  },
};
