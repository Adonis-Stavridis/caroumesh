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

export const Basic: Story = {
  args: {
    dimensions: {
      height: 500,
    },
    scenes: [
      {
        src: 'assets/StarDestroyer.gltf',
        scale: 0.08,
        lightIntensity: 0.005,
      },
      { src: 'assets/TieFighter.gltf', scale: 4 },
    ],
    controls: true,
    shadows: true,
  },
};
