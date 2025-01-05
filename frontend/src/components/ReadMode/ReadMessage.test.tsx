import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import ReadMessage from './ReadMessage';

describe('ReadMessage', () => {
  it('should show Decode only after the user has entered a private key', async () => {
    render(<ReadMessage />);
    const user = userEvent.setup();
    expect(screen.queryByText(/Decode Message/)).not.toBeInTheDocument();
    await user.type(screen.getByLabelText('n:'), '531');
    await user.type(screen.getByLabelText('d:'), '642');
    await user.click(screen.getByText('Submit'));
    expect(screen.queryByText(/Decode Message/)).toBeInTheDocument();
  });
});
