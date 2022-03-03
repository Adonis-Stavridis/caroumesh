import { themes } from '@storybook/theming';

// https://storybook.js.org/docs/react/writing-stories/parameters#global-parameters
export const parameters = {
  // https://storybook.js.org/docs/react/essentials/actions#automatically-matching-args
  actions: { argTypesRegex: '^on.*' },
  controls: { expanded: true },
  darkMode: {
    current: 'dark',
  },
  docs: {
    theme: themes.dark,
  },
};
