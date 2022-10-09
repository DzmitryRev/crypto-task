/* eslint-disable no-undef */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/jsx-filename-extension */
import { fireEvent, render, screen } from '@testing-library/react';
import 'jest-styled-components';
import Modal from './Modal';

test('Modal close test', () => {
  const closeCallback = jest.fn();
  render(
    <Modal closeCallback={() => { closeCallback(); }}>Hi</Modal>,
  );
  const modalShadow = screen.getByTestId('modal-shadow');
  const modal = screen.getByTestId('modal');
  const modalClose = screen.getByTestId('modal-close-btn');
  expect(modalShadow).toBeInTheDocument();
  fireEvent.click(modalShadow);
  fireEvent.click(modalClose);
  // Not called from modal click, call only from shadow or close btn
  fireEvent.click(modal);
  expect(closeCallback).not.toBeCalledTimes(3);
  expect(closeCallback).toBeCalledTimes(2);
});

test('Modal children prop test', () => {
  render(
    <Modal>Hello</Modal>,
  );
  const modal = screen.getByTestId('modal');
  expect(modal).toBeInTheDocument();
  expect(modal).toHaveTextContent('Hello');
});

test('Modal isOpen prop test', () => {
  render(
    <Modal isOpen={false}>Hello</Modal>,
  );
  const modal = screen.getByTestId('modal');
  expect(modal).toBeInTheDocument();
  expect(modal).not.toBeVisible();
});
