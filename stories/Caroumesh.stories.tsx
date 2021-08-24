import { args } from 'commander';
import React from 'react';

import { Caroumesh } from '../src/components/caroumesh';

export default {
  title: 'Caroumesh/Caroumesh',
  component: Caroumesh,
};

const Template = args => <Caroumesh {...args} />;

export const Default = Template.bind({});
