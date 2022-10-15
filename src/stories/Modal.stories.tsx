/* eslint-disable linebreak-style */
/* eslint-disable react/function-component-definition */
/* eslint-disable react/jsx-props-no-spreading */
import React from "react";

import { ComponentStory, ComponentMeta } from "@storybook/react";
import Modal from "../components/Modal/Modal";
import { MemoryRouter, Outlet, Route, Routes } from "react-router-dom";
import ButtonLink from "../components/Link/Link";

export default {
  title: "Modal",
  component: Modal,
  args: {
    children: ""
  },
  decorators: [
    (Story) => (
      <MemoryRouter>
        <ButtonLink color="green" path="/modal">
          open modal
        </ButtonLink>
        <Routes>
          <Route path="/modal" element={<Story />} />
        </Routes>
      </MemoryRouter>
    ),
  ],
} as ComponentMeta<typeof Modal>;

const Template: ComponentStory<typeof Modal> = (args) => <Modal {...args}></Modal>;

export const Default = Template.bind({});
Default.args = {
  type: "default",
};

export const Minify = Template.bind({});
Minify.args = {
  type: "minify",
};
