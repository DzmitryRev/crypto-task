/* eslint-disable linebreak-style */
/* eslint-disable react/function-component-definition */
/* eslint-disable react/jsx-props-no-spreading */
import React from "react";

import { ComponentStory, ComponentMeta } from "@storybook/react";
import TableRow from "../components/TableRow/TableRow";
import { StyledTableCell } from "../components/Table/StyledTable";
import Table from "../components/Table/Table";
import Variables from "../styles/variables";

export default {
  title: "Table",
  component: Table,
} as ComponentMeta<typeof Table>;

const Template: ComponentStory<typeof Table> = (args) => <Table {...args}>
    <TableRow>
        <StyledTableCell>Cell 1</StyledTableCell>
        <StyledTableCell breakpoint={Variables.bp.l}>Cell 2</StyledTableCell>
        <StyledTableCell breakpoint={Variables.bp.m}>Cell 3</StyledTableCell>
        <StyledTableCell breakpoint={Variables.bp.s}>Cell 4</StyledTableCell>
      </TableRow>
</Table>;

export const Default = Template.bind({});
Default.args = {
  head: (
    <TableRow>
      <StyledTableCell>Head cell 1</StyledTableCell>
      <StyledTableCell breakpoint={Variables.bp.l}>Head cell 2</StyledTableCell>
      <StyledTableCell breakpoint={Variables.bp.m}>Head cell 3</StyledTableCell>
      <StyledTableCell breakpoint={Variables.bp.s}>Head cell 4</StyledTableCell>
    </TableRow>
  ),
};
