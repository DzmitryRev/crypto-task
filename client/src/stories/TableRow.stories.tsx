/* eslint-disable linebreak-style */
/* eslint-disable react/function-component-definition */
/* eslint-disable react/jsx-props-no-spreading */
import React from "react";

import { ComponentStory, ComponentMeta } from "@storybook/react";
import TableRow from "../components/TableRow/TableRow";
import { StyledTableCell } from "../components/Table/StyledTable";

export default {
  title: "TableRow",
  component: TableRow,
  decorators: [
    (Story) => (
      <table>
        <tbody>
          <Story />
          <Story />
          <Story />
        </tbody>
      </table>
    ),
  ],
} as ComponentMeta<typeof TableRow>;

const Template: ComponentStory<typeof TableRow> = () => (
  <TableRow>
    <StyledTableCell maxWidth={150}>Cell #1</StyledTableCell>
    <StyledTableCell maxWidth={150}>Cell #2</StyledTableCell>
    <StyledTableCell maxWidth={150}>Cell #3</StyledTableCell>
  </TableRow>
);

export const Default = Template.bind({});
