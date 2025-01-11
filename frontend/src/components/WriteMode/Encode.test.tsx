import axios from 'axios';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { EncodeResponse } from '../../types';
import Encode from './Encode';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Encode', () => {
  beforeEach(() => mockedAxios.post.mockReset());
  afterAll(() => mockedAxios.post.mockRestore());

  it('should display the form before user submission and the ciphertext after', async () => {
    const encodeResponse: EncodeResponse = {
      type: 'encode',
      result: { ciphertext: [1, 2, 3, 4, 5] },
    };
    mockedAxios.post.mockResolvedValueOnce({ data: encodeResponse });
    render(<Encode n={98} e={76} />);
    const user = userEvent.setup();
    const plaintextInput = screen.getByLabelText(/Enter your/);
    expect(plaintextInput).toBeInTheDocument();
    expect(screen.queryByText('1, 2, 3, 4, 5')).not.toBeInTheDocument();
    await user.type(plaintextInput, 'Hello RSA');
    await user.click(screen.getByText('Encode'));
    expect(plaintextInput).not.toBeInTheDocument();
    expect(screen.queryByText('1, 2, 3, 4, 5')).toBeInTheDocument();
  });

  it("should correctly make a POST request on submit with the user's plaintext", async () => {
    mockedAxios.post.mockResolvedValueOnce({ data: 'successful call' });
    render(<Encode n={54} e={3} />);
    const user = userEvent.setup();
    await user.type(screen.getByLabelText(/Enter your/), 'Hello API');
    await user.click(screen.getByText('Encode'));
    expect(mockedAxios.post).toHaveBeenCalledWith('http://127.0.0.1:5000/calculate', {
      type: 'encode',
      n: 54,
      e: 3,
      plaintext: 'Hello API',
    });
  });
});
