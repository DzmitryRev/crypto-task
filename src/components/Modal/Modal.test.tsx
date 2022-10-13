import { fireEvent, render, screen } from "@testing-library/react";
import "jest-styled-components";
import { BrowserRouter } from "react-router-dom";
import Modal from "./Modal";

test("Modal type prop test", () => {
  render(
    <BrowserRouter>
      <Modal type="default">Hi</Modal>
    </BrowserRouter>
  );
  const modal = screen.getByTestId("modal");
  expect(modal).toHaveStyleRule("width", "560px");
});

test("Modal type prop test #2", () => {
  render(
    <BrowserRouter>
      <Modal type="minify">Hi</Modal>
    </BrowserRouter>
  );
  const modal = screen.getByTestId("modal");
  expect(modal).toHaveStyleRule("width", "320px");
});

test("Modal children prop test", () => {
  render(
    <BrowserRouter>
      <Modal type="minify">Hello</Modal>
    </BrowserRouter>
  );
  const modal = screen.getByTestId("modal");
  expect(modal).toBeInTheDocument();
  expect(modal).toHaveTextContent("Hello");
});
