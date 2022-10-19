import { ComponentStory, ComponentMeta } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import ButtonLink from '../components/Link/Link';

export default {
  title: 'ButtonLink',
  component: ButtonLink,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
} as ComponentMeta<typeof ButtonLink>;

const Template: ComponentStory<typeof ButtonLink> = (args) => (
  <ButtonLink {...args}>Hello world</ButtonLink>
);

export const Blue = Template.bind({});
Blue.args = {
  color: 'blue',
};

export const Red = Template.bind({});
Red.args = {
  color: 'red',
};

export const Green = Template.bind({});
Green.args = {
  color: 'green',
};
