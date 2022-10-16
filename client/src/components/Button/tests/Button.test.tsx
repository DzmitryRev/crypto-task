import { fireEvent, render, screen } from "@testing-library/react";
import Button from "../Button";
import "jest-styled-components";
import Variables from "../../../styles/variables";

test('Should render Button with "Hello" children', () => {
  render(<Button color="red">Hello</Button>);
  const helloButton = screen.getByTestId("button");
  expect(helloButton).toBeInTheDocument();
  expect(helloButton).toHaveTextContent("Hello");
  expect(helloButton).not.toHaveTextContent("World");
});

test("Should render green Button component", () => {
  render(<Button color="green">Hello</Button>);
  const greenButton = screen.getByTestId("button");
  expect(greenButton).toHaveStyleRule("background-color", Variables.colors.green);
  expect(greenButton).not.toHaveStyleRule("background-color", Variables.colors.red);
  expect(greenButton).not.toHaveStyleRule("background-color", Variables.colors.blue);
});

test("Should render red Button component", () => {
  render(<Button color="red">Hello</Button>);
  const greenButton = screen.getByTestId("button");
  expect(greenButton).toHaveStyleRule("background-color", Variables.colors.red);
  expect(greenButton).not.toHaveStyleRule("background-color", Variables.colors.green);
  expect(greenButton).not.toHaveStyleRule("background-color", Variables.colors.blue);
});

test("Should render green Button component", () => {
  render(<Button color="blue">Hello</Button>);
  const greenButton = screen.getByTestId("button");
  expect(greenButton).toHaveStyleRule("background-color", Variables.colors.blue);
  expect(greenButton).not.toHaveStyleRule("background-color", Variables.colors.green);
  expect(greenButton).not.toHaveStyleRule("background-color", Variables.colors.red);
});

test("Should render disbled Button component", () => {
  render(
    <Button color="red" disabled>
      Hello
    </Button>
  );
  const greenButton = screen.getByTestId("button");
  expect(greenButton).toHaveAttribute("disabled");
});

test("Should render Button with callback component", () => {
  const handleClick = jest.fn();
  render(
    <Button
      color="red"
      action={() => {
        handleClick();
      }}
    >
      Hello
    </Button>
  );
  const button = screen.getByTestId("button");
  fireEvent.click(button);
  expect(handleClick).toBeCalled();

  fireEvent.click(button);
  fireEvent.click(button);

  expect(handleClick).toBeCalledTimes(3);
});
