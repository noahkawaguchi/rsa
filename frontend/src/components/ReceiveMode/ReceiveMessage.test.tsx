import axios from 'axios';
import '@testing-library/jest-dom/';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { CalculationRequest } from '../../types';
import ReceiveMessage from './ReceiveMessage';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('ReceiveMessage', () => {
  beforeEach(() => mockedAxios.post.mockReset());
  afterAll(() => mockedAxios.post.mockRestore());

  it('should show GenerateKeys only after the user has generated primes', async () => {
    mockedAxios.post.mockImplementation((_: string, data?: unknown) => {
      const requestData = data as CalculationRequest;
      if (requestData.type === 'primes') {
        return Promise.resolve({ data: { type: 'primes', result: { p: 3, q: 5 } } });
      } else if (requestData.type === 'keys') {
        return Promise.resolve({ data: { type: 'keys', result: { n: 1, e: 2, d: 3 } } });
      } else {
        return Promise.reject(new Error(`Unsupported calculation type: ${requestData.type}`));
      }
    });
    render(<ReceiveMessage />);
    const user = userEvent.setup();
    expect(screen.queryByText(/Generate keys/)).not.toBeInTheDocument(); // queryByText returns null
    await user.click(screen.getByText('Unicode symbols'));
    expect(screen.queryByText(/Generate keys/)).toBeInTheDocument();
  });
});
