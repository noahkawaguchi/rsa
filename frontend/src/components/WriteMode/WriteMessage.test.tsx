import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import WriteMessage from './WriteMessage';

describe('WriteMessage', () => {
  it('should show Encode only after the user has entered a public key', async () => {
    render(<WriteMessage />);
    const user = userEvent.setup();
    expect(screen.queryByText(/Encode Message/)).not.toBeInTheDocument();
    await user.type(screen.getByLabelText('n:'), '135');
    await user.type(screen.getByLabelText('e:'), '246');
    await user.click(screen.getByText('Submit'));
    expect(screen.queryByText(/Encode Message/)).toBeInTheDocument();
  });
});
