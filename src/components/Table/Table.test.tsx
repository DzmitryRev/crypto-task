import { render, screen } from "@testing-library/react";
import "jest-styled-components";
import Table from "./Table";

test("Table component render test", () => {
  render(
    <Table>
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
