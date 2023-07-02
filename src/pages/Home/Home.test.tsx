import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import fetchMock from 'jest-fetch-mock';
import { MemoryRouter } from 'react-router-dom';
import Home from './Home';

beforeEach(() => {
  fetchMock.resetMocks();
});

test('renders Home component and select a pizza', async () => {
  fetchMock.mockResponseOnce(
    JSON.stringify([
      { id: 1, name: 'Pizza Margherita' },
      { id: 2, name: 'Pizza Pepperoni' },
    ])
  );

  render(<MemoryRouter><Home /></MemoryRouter>);

  expect(await screen.findByText('Welcome to John Pizza Store!')).toBeInTheDocument();
  expect(await screen.findByText('Pizza Margherita')).toBeInTheDocument();
  expect(await screen.findByText('Pizza Pepperoni')).toBeInTheDocument();

  userEvent.selectOptions(screen.getByRole('combobox'), '1');
  expect((screen.getByRole('combobox') as HTMLSelectElement).value).toBe('1');
});
