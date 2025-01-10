import axios from 'axios';
import '@testing-library/jest-dom';
import { render, screen, act } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { KeysResponse } from '../../types';
import GenerateKeys from './GenerateKeys';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('GenerateKeys', () => {
  beforeEach(() => mockedAxios.post.mockReset());
  afterAll(() => mockedAxios.post.mockRestore());

  it('should retrieve keys upon render', async () => {
    mockedAxios.post.mockResolvedValueOnce({ data: { result: 'hello' } });
    await act(async () => render(<GenerateKeys p={19} q={23} />));
    expect(mockedAxios.post).toHaveBeenCalledWith('/calculate', {
      type: 'keys',
      p: 19,
      q: 23,
    });
  });

  it('should show an explanation before the button click and the keys after', async () => {
    const keysResponse: KeysResponse = { type: 'keys', result: { n: 11, e: 22, d: 33 } };
    mockedAxios.post.mockResolvedValueOnce({ data: keysResponse });
    await act(async () => render(<GenerateKeys p={19} q={23} />));
    const user = userEvent.setup();
    expect(screen.queryByText(/you can openly broadcast your public key/)).toBeInTheDocument();
    expect(screen.queryByText('Keep these somewhere safe!')).not.toBeInTheDocument();
    await user.click(screen.getByText('Generate keys from primes'));
    expect(screen.queryByText(/you can openly broadcast your public key/)).not.toBeInTheDocument();
    expect(screen.queryByText('Keep these somewhere safe!')).toBeInTheDocument();
  });

  it('should display the correct values for n, e, and d', async () => {
    const keysResponse: KeysResponse = { type: 'keys', result: { n: 44, e: 55, d: 66 } };
    mockedAxios.post.mockResolvedValueOnce({ data: keysResponse });
    await act(async () => render(<GenerateKeys p={29} q={31} />));
    const user = userEvent.setup();
    await user.click(screen.getByText('Generate keys from primes'));
    expect(screen.getByText(/Your public key/)).toHaveTextContent(
      'Your public key (n, e) is (44, 55).'
    );
    expect(screen.getByText(/Your private key/)).toHaveTextContent(
      'Your private key (n, d) is (44, 66).'
    );
  });
});
