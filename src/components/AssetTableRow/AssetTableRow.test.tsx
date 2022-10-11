import { fireEvent, render, screen } from "@testing-library/react";
import "jest-styled-components";
import { BrowserRouter } from "react-router-dom";
import AssetTableRow from "./AssetTableRow";

test("Asset table row props test", () => {
  render(
    <BrowserRouter>
      <table>
        <tbody>
          <AssetTableRow id="1" name="testName" symbol="testSymbol" price="100" changePerDay="50" />
        </tbody>
      </table>
    </BrowserRouter>
  );
  const tableRow = screen.getByTestId("table-row");
  expect(tableRow).toBeInTheDocument();
  expect(tableRow).toHaveTextContent("testName");
  expect(tableRow).toHaveTextContent("testSymbol");
  expect(tableRow).toHaveTextContent("100.00");
  expect(tableRow).toHaveTextContent("50.00");
});

test("Asset table link test", () => {
  render(
    <BrowserRouter>
      <table>
        <tbody>
          <AssetTableRow
            id="testId"
            name="testName"
            symbol="testSymbol"
            price="100"
            changePerDay="50"
          />
        </tbody>
      </table>
    </BrowserRouter>
  );
  const tableRow = screen.getByText("testName");
  expect(tableRow).toBeInTheDocument();
  expect(tableRow).toHaveTextContent("testName");
  expect(tableRow).toHaveAttribute("href", "/asset/testId");
});
