/* eslint-disable no-undef */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/jsx-filename-extension */
import { fireEvent, render, screen } from '@testing-library/react';
import Button from './Button';
import 'jest-styled-components';

test('Button children prop test', () => {
  render(<Button>Hello</Button>);
  const helloButton = screen.getByTestId('button');
  expect(helloButton).toBeInTheDocument();
  expect(helloButton).toHaveTextContent('Hello');
  expect(helloButton).not.toHaveTextContent('World');
});

test('Button color prop test', () => {
  render(<Button color="green">Hello</Button>);
  const greenButton = screen.getByTestId('button');
  expect(greenButton).toHaveStyleRule('background-color', 'var(--green-color)');
  expect(greenButton).not.toHaveStyleRule('background-color', 'var(--red-color)');
  expect(greenButton).not.toHaveStyleRule('background-color', 'var(--blue-color)');
});

test('Button disbled prop test', () => {
  render(<Button disabled>Hello</Button>);
  const greenButton = screen.getByTestId('button');
  expect(greenButton).toHaveAttribute('disabled');
});

test('Button action prop test', () => {
  const handleClick = jest.fn();
  render(<Button action={() => { handleClick(); }}>Hello</Button>);
  const button = screen.getByTestId('button');
  fireEvent.click(button);
  expect(handleClick).toBeCalled();

  fireEvent.click(button);
  fireEvent.click(button);

  expect(handleClick).toBeCalledTimes(3);
});
