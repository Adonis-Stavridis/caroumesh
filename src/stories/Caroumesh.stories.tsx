import type { Meta, StoryObj } from '@storybook/react';

import { Caroumesh } from 'caroumesh';
import { ASSETS_EXAMPLE_PROPS } from 'src/assets/asset.constants';

const meta: Meta<typeof Caroumesh> = {
  title: 'Components/Caroumesh',
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
    ...ASSETS_EXAMPLE_PROPS,
  },
};
