import { render, screen } from '@testing-library/react';
import 'jest-styled-components';
import Loading from './Loading';

test('Loading component test', () => {
  render(
    <Loading />,
  );
  const loading = screen.getByTestId('loading');
  expect(loading).toBeInTheDocument();
  expect(loading).toHaveClass('loading-gif');
});
