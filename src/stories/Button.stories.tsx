/* eslint-disable linebreak-style */
/* eslint-disable react/function-component-definition */
/* eslint-disable react/jsx-props-no-spreading */
import React from "react";

import { ComponentStory, ComponentMeta, storiesOf } from "@storybook/react";
import Button from "../components/Button/Button";
import { RedeemTwoTone } from "@mui/icons-material";

export default {
  title: "Example/LinkButton",
  component: Button,
  argTypes: {},
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args}>Hello world</Button>;

export const Blue = Template.bind({});
Blue.args = {
  color: "blue",
  action: () => {console.log("hello world!")}
};

export const Red = Template.bind({});
Red.args = {
  color: "red",
};

export const Green = Template.bind({});
Green.args = {
  color: "green",
};
