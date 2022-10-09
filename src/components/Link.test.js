/* eslint-disable no-undef */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/jsx-filename-extension */
import { render, screen } from '@testing-library/react';
import 'jest-styled-components';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import ButtonLink from './Link';

test('Link children prop test', () => {
  render(
    <BrowserRouter>
      <ButtonLink path="/">Hello</ButtonLink>
    </BrowserRouter>,
  );
  const helloLinkButton = screen.getByTestId('link');
  expect(helloLinkButton).toBeInTheDocument();
  expect(helloLinkButton).toHaveTextContent('Hello');
  expect(helloLinkButton).not.toHaveTextContent('World');
});

test('Link color prop test', () => {
  render(
    <BrowserRouter>
      <ButtonLink color="red" path="/">
        Hello
      </ButtonLink>
    </BrowserRouter>,
  );
  const greenLinkButton = screen.getByTestId('link');
  expect(greenLinkButton).toHaveStyleRule('background-color', 'var(--red-color)');
  expect(greenLinkButton).not.toHaveStyleRule('background-color', 'var(--green-color)');
  expect(greenLinkButton).not.toHaveStyleRule('background-color', 'var(--blue-color)');
});

test('Link path prop test', async () => {
  render(
    <MemoryRouter>
      <ButtonLink color="red" path="/testpath">
        Hello
      </ButtonLink>
    </MemoryRouter>,
  );
  const link = screen.getByTestId('link');
  expect(link).toHaveAttribute('href', '/testpath');
});
