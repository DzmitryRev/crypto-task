/* eslint-disable linebreak-style */
/* eslint-disable react/function-component-definition */
/* eslint-disable react/jsx-props-no-spreading */
import React from "react";

import { ComponentStory, ComponentMeta, storiesOf } from "@storybook/react";
import ButtonLink from "../components/Link/Link";
import { MemoryRouter } from "react-router-dom";

export default {
  title: "ButtonLink",
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
  color: "blue",
};

export const Red = Template.bind({});
Red.args = {
  color: "red",
};

export const Green = Template.bind({});
Green.args = {
  color: "green",
};
