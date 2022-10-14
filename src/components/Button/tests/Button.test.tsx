import { fireEvent, render, screen } from '@testing-library/react';
import Button from '../Button';
import 'jest-styled-components';
import Variables from "../../../styles/variables";

test('Button children prop test', () => {
  render(<Button color="red">Hello</Button>);
  const helloButton = screen.getByTestId('button');
  expect(helloButton).toBeInTheDocument();
  expect(helloButton).toHaveTextContent('Hello');
  expect(helloButton).not.toHaveTextContent('World');
});

test('Button color prop test', () => {
  render(<Button color="green">Hello</Button>);
  const greenButton = screen.getByTestId('button');
  expect(greenButton).toHaveStyleRule('background-color', Variables.colors.green);
  expect(greenButton).not.toHaveStyleRule('background-color', Variables.colors.red);
  expect(greenButton).not.toHaveStyleRule('background-color', Variables.colors.blue);
});

test('Button disbled prop test', () => {
  render(<Button color="red" disabled>Hello</Button>);
  const greenButton = screen.getByTestId('button');
  expect(greenButton).toHaveAttribute('disabled');
});

test('Button action prop test', () => {
  const handleClick = jest.fn();
  render(<Button color="red" action={() => { handleClick(); }}>Hello</Button>);
  const button = screen.getByTestId('button');
  fireEvent.click(button);
  expect(handleClick).toBeCalled();

  fireEvent.click(button);
  fireEvent.click(button);

  expect(handleClick).toBeCalledTimes(3);
});
