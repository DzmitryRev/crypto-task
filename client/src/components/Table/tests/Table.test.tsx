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
      body={<tr></tr>}
    />
  );
  const table = screen.getByTestId("table");
  expect(table).toBeInTheDocument();
  expect(table).toHaveTextContent("head 1");
  expect(table).toHaveTextContent("head 1");
  expect(table).toHaveTextContent("head 1");
});

test("Should render Table component with children", () => {
  render(
    <Table
      head={<tr></tr>}
      body={
        <tr>
          <td>body 1</td>
          <td>body 2</td>
          <td>body 3</td>
        </tr>
      }
    />
  );
  const table = screen.getByTestId("table");
  expect(table).toBeInTheDocument();
  expect(table).toHaveTextContent("body 1");
  expect(table).toHaveTextContent("body 2");
  expect(table).toHaveTextContent("body 3");
});
