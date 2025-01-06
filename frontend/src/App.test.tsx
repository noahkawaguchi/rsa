import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import App from './App';

describe('App', () => {
  it('should allow the user to navigate to and from the main menu', async () => {
    render(<App />);
    const user = userEvent.setup();

    expect(screen.queryByText('Receive Message')).toBeInTheDocument();
    expect(screen.queryByText('Home')).not.toBeInTheDocument();
    await user.click(screen.getByText('Receive Message'));
    expect(screen.queryByText('Receive Message')).not.toBeInTheDocument();
    expect(screen.queryByText('Home')).toBeInTheDocument();
    await user.click(screen.getByText('Home'));

    expect(screen.queryByText('Write Message')).toBeInTheDocument();
    expect(screen.queryByText('Home')).not.toBeInTheDocument();
    await user.click(screen.getByText('Write Message'));
    expect(screen.queryByText('Write Message')).not.toBeInTheDocument();
    expect(screen.queryByText('Home')).toBeInTheDocument();
    await user.click(screen.getByText('Home'));

    expect(screen.queryByText('Read Message')).toBeInTheDocument();
    expect(screen.queryByText('Home')).not.toBeInTheDocument();
    await user.click(screen.getByText('Read Message'));
    expect(screen.queryByText('Read Message')).not.toBeInTheDocument();
    expect(screen.queryByText('Home')).toBeInTheDocument();
  });
});
