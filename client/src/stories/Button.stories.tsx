/* eslint-disable linebreak-style */
/* eslint-disable react/function-component-definition */
/* eslint-disable react/jsx-props-no-spreading */
import React from "react";

import { ComponentStory, ComponentMeta, storiesOf } from "@storybook/react";
import Button from "../components/Button/Button";

export default {
  title: "Button",
  component: Button,
  argTypes: { action: { action: "click" } },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args}>Hello world</Button>;

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