import { render, screen } from '@testing-library/react';
import 'jest-styled-components';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import Variables from "../../styles/variables";
import ButtonLink from './Link';

test('Link children prop test', () => {
  render(
    <BrowserRouter>
      <ButtonLink color="red" path="/">Hello</ButtonLink>
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
  expect(greenLinkButton).toHaveStyleRule('background-color', Variables.colors.red);
  expect(greenLinkButton).not.toHaveStyleRule('background-color', Variables.colors.green);
  expect(greenLinkButton).not.toHaveStyleRule('background-color', Variables.colors.blue);
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
