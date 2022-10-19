import { fireEvent, render, screen } from '@testing-library/react';
import 'jest-styled-components';
import Pagination from '../Pagination';

test('Should render Pagination component', () => {
  render(<Pagination setPage={() => {}} currentOffset={0} />);
  const pagination = screen.getByTestId('pagination');
  expect(pagination).toBeInTheDocument();
});

test('Should render Pagination component at first page', () => {
  render(<Pagination setPage={() => {}} currentOffset={0} />);
  const prevPageButton = screen.getByText('<');
  expect(prevPageButton).toHaveAttribute('disabled');
});

test('Should call setPage on click < or >', () => {
  const mockSetPage = jest.fn();
  render(<Pagination setPage={mockSetPage} currentOffset={10} />);
  const prevPageButton = screen.getByText('<');
  const nextPageButton = screen.getByText('>');
  fireEvent.click(prevPageButton);
  fireEvent.click(nextPageButton);
  expect(mockSetPage).toHaveBeenCalledTimes(2);
});
