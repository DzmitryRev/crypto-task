import { render, screen } from '@testing-library/react';
import 'jest-styled-components';
import { BrowserRouter } from 'react-router-dom';
import Modal from '../Modal';

test('Should render default Modal component (width 560px)', () => {
  render(
    <BrowserRouter>
      <Modal type="default">Hi</Modal>
    </BrowserRouter>,
  );
  const modal = screen.getByTestId('modal');
  expect(modal).toHaveStyleRule('width', '560px');
});

test('Should render minify Modal component (width 320px)', () => {
  render(
    <BrowserRouter>
      <Modal type="minify">Hi</Modal>
    </BrowserRouter>,
  );
  const modal = screen.getByTestId('modal');
  expect(modal).toHaveStyleRule('width', '320px');
});

test("Should render Modal component with 'Hello' children", () => {
  render(
    <BrowserRouter>
      <Modal type="minify">Hello</Modal>
    </BrowserRouter>,
  );
  const modal = screen.getByTestId('modal');
  expect(modal).toBeInTheDocument();
  expect(modal).toHaveTextContent('Hello');
});
