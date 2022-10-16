/* eslint-disable linebreak-style */
/* eslint-disable react/function-component-definition */
/* eslint-disable react/jsx-props-no-spreading */
import React from "react";

import { ComponentStory, ComponentMeta } from "@storybook/react";
import Loading from "../components/Loading/Loading";

export default {
  title: "Loading",
  component: Loading,
} as ComponentMeta<typeof Loading>;

const Template: ComponentStory<typeof Loading> = () => <Loading />;

export const Default = Template.bind({});

