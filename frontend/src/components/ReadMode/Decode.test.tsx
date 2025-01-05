import axios from 'axios';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { DecodeResponse } from '../../types';
import Decode from './Decode';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Decode', () => {
  beforeEach(() => mockedAxios.post.mockReset());
  afterAll(() => mockedAxios.post.mockRestore());

  it('should display the form before user submission and the plaintext after', async () => {
    const decodeResponse: DecodeResponse = {
      type: 'decode',
      result: { plaintext: 'Hello RSA' },
    };
    mockedAxios.post.mockResolvedValueOnce({ data: decodeResponse });
    render(<Decode n={98} d={76} />);
    const user = userEvent.setup();
    const ciphertextInput = screen.getByLabelText(/Enter the/);
    expect(ciphertextInput).toBeInTheDocument();
    expect(screen.queryByText('Hello RSA')).not.toBeInTheDocument();
    await user.type(ciphertextInput, '1, 2, 3, 4, 5');
    await user.click(screen.getByText('Decode'));
    expect(ciphertextInput).not.toBeInTheDocument();
    expect(screen.queryByText('Hello RSA')).toBeInTheDocument();
  });

  it("should correctly make a POST request on submit with the user's ciphertext", async () => {
    mockedAxios.post.mockResolvedValueOnce({ data: 'successful call' });
    render(<Decode n={25} d={362} />);
    const user = userEvent.setup();
    await user.type(screen.getByLabelText(/Enter the/), '3475, 34577, 56434, 34');
    await user.click(screen.getByText('Decode'));
    expect(mockedAxios.post).toHaveBeenCalledWith('http://127.0.0.1:5000/calculate', {
      type: 'decode',
      n: 25,
      d: 362,
      ciphertext: [3475, 34577, 56434, 34],
    });
  });

  it('should show an alert for invalid input', async () => {
    window.alert = jest.fn();
    render(<Decode n={54} d={3} />);
    const user = userEvent.setup();
    await user.type(screen.getByLabelText(/Enter the/), 'invalid, input, here');
    await user.click(screen.getByText('Decode'));
    expect(window.alert).toHaveBeenCalledWith(
      'Invalid input. Please enter a comma-separated list of integers like the example.'
    );
  });
});
