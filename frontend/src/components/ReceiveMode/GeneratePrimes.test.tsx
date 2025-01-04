import axios from 'axios';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { PrimesResponse } from '../../types';
import GeneratePrimes from './GeneratePrimes';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('GeneratePrimes', () => {
  beforeEach(() => mockedAxios.post.mockClear());
  afterAll(() => mockedAxios.post.mockRestore());

  it("should retrieve and display primes p and q in response to the user's choice", async () => {
    const primesResponse: PrimesResponse = { type: 'primes', result: { p: 7, q: 11 } };
    mockedAxios.post.mockResolvedValueOnce({ data: primesResponse });
    render(<GeneratePrimes updatePrimes={jest.fn()} />);
    const user = userEvent.setup();
    expect(screen.queryByText(/Your primes p and q are/)).not.toBeInTheDocument();
    await user.click(screen.getByText('ASCII only'));
    const yourPrimes = screen.queryByText(/Your primes p and q are/);
    expect(yourPrimes).toBeInTheDocument();
    expect(yourPrimes).toHaveTextContent('Your primes p and q are 7 and 11.');
  });

  it('should inform the parent of the retrieved primes', async () => {
    const primesResponse: PrimesResponse = { type: 'primes', result: { p: 13, q: 17 } };
    mockedAxios.post.mockResolvedValueOnce({ data: primesResponse });
    const updatePrimes = jest.fn();
    render(<GeneratePrimes updatePrimes={updatePrimes} />);
    const user = userEvent.setup();
    await user.click(screen.getByText('Unicode symbols'));
    expect(updatePrimes).toHaveBeenCalledWith({ p: 13, q: 17 });
  });
});
