import { render, screen } from "@testing-library/react";
import "jest-styled-components";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import Variables from "../../../styles/variables";
import ButtonLink from "../Link";

test('Should render ButtonLink component with "Hello" children', () => {
  render(
    <BrowserRouter>
      <ButtonLink color="red" path="/">
        Hello
      </ButtonLink>
    </BrowserRouter>
  );
  const helloLinkButton = screen.getByTestId("link");
  expect(helloLinkButton).toBeInTheDocument();
  expect(helloLinkButton).toHaveTextContent("Hello");
  expect(helloLinkButton).not.toHaveTextContent("World");
});

test("Should render green ButtonLink component", () => {
  render(
    <BrowserRouter>
      <ButtonLink color="green" path="/">
        Hello
      </ButtonLink>
    </BrowserRouter>
  );
  const greenLinkButton = screen.getByTestId("link");
  expect(greenLinkButton).toHaveStyleRule("background-color", Variables.colors.green);
  expect(greenLinkButton).not.toHaveStyleRule("background-color", Variables.colors.red);
  expect(greenLinkButton).not.toHaveStyleRule("background-color", Variables.colors.blue);
});

test("Should render red ButtonLink component", () => {
  render(
    <BrowserRouter>
      <ButtonLink color="red" path="/">
        Hello
      </ButtonLink>
    </BrowserRouter>
  );
  const greenLinkButton = screen.getByTestId("link");
  expect(greenLinkButton).toHaveStyleRule("background-color", Variables.colors.red);
  expect(greenLinkButton).not.toHaveStyleRule("background-color", Variables.colors.green);
  expect(greenLinkButton).not.toHaveStyleRule("background-color", Variables.colors.blue);
});

test("Should render blue ButtonLink component", () => {
  render(
    <BrowserRouter>
      <ButtonLink color="blue" path="/">
        Hello
      </ButtonLink>
    </BrowserRouter>
  );
  const greenLinkButton = screen.getByTestId("link");
  expect(greenLinkButton).toHaveStyleRule("background-color", Variables.colors.blue);
  expect(greenLinkButton).not.toHaveStyleRule("background-color", Variables.colors.red);
  expect(greenLinkButton).not.toHaveStyleRule("background-color", Variables.colors.green);
});

test("Should render ButtonLink component with hfref attribute", async () => {
  render(
    <MemoryRouter>
      <ButtonLink color="red" path="/testpath">
        Hello
      </ButtonLink>
    </MemoryRouter>
  );
  const link = screen.getByTestId("link");
  expect(link).toHaveAttribute("href", "/testpath");
});
