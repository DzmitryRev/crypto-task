import { render, screen } from "@testing-library/react";
import "jest-styled-components";
import { StyledTableCell } from "../../Table/StyledTable";
import TableRow from "../TableRow";

test("Should render TableRow component with children", () => {
  render(
    <table>
      <tbody>
        <TableRow>
          <td>1</td>
          <td>2</td>
          <td>3</td>
        </TableRow>
      </tbody>
    </table>
  );
  const tableRow = screen.getByTestId("table-row");
  expect(tableRow).toBeInTheDocument();
  expect(tableRow).toHaveTextContent("1");
  expect(tableRow).toHaveTextContent("2");
  expect(tableRow).toHaveTextContent("3");
});

test("Should render TableCell component with maxWidth", () => {
  render(
    <table>
      <tbody>
        <TableRow>
          <StyledTableCell maxWidth={100}>1</StyledTableCell>
        </TableRow>
      </tbody>
    </table>
  );
  const cell100width = screen.getByText("1");
  expect(cell100width).toBeInTheDocument();
  expect(cell100width).toHaveTextContent("1");
  expect(cell100width).toHaveStyleRule("max-width", "100px");
});
