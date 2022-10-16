import { render, screen } from "@testing-library/react";
import "jest-styled-components";
import Table from "../Table";

test("Should render Table component with head row", () => {
  render(
    <Table
      head={
        <tr>
          <td>head 1</td>
          <td>head 2</td>
          <td>head 3</td>
        </tr>
      }
    >
      <tr></tr>
    </Table>
  );
  const table = screen.getByTestId("table");
  expect(table).toBeInTheDocument();
  expect(table).toHaveTextContent("head 1");
  expect(table).toHaveTextContent("head 1");
  expect(table).toHaveTextContent("head 1");
});

test("Should render Table component with children", () => {
  render(
    <Table head={<tr></tr>}>
      <tr>
        <td>1</td>
        <td>2</td>
        <td>3</td>
      </tr>
    </Table>
  );
  const table = screen.getByTestId("table");
  expect(table).toBeInTheDocument();
  expect(table).toHaveTextContent("1");
  expect(table).toHaveTextContent("2");
  expect(table).toHaveTextContent("3");
});
