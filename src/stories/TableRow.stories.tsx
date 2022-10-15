/* eslint-disable linebreak-style */
/* eslint-disable react/function-component-definition */
/* eslint-disable react/jsx-props-no-spreading */
import React from "react";

import { ComponentStory, ComponentMeta } from "@storybook/react";
import TableRow from "../components/TableRow/TableRow";

export default {
  title: "TableRow",
  component: TableRow,
} as ComponentMeta<typeof TableRow>;

const Template: ComponentStory<typeof TableRow> = () => <TableRow></TableRow>;

export const Default = Template.bind({});
Default.args = {
  children: <>
  <td>Cell #1</td>
  <td>Cell #2</td>
  <td>Cell #3</td>
  </>,
};
