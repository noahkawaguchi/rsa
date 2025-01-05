import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import EnterPrivateKey from './EnterPrivateKey';

describe('EnterPrivateKey', () => {
  it('should display the form before user submission and the keys after', async () => {
    render(<EnterPrivateKey updatePrivateKey={jest.fn()} />);
    const user = userEvent.setup();
    expect(screen.queryByText("your private key")).toBeInTheDocument();
    expect(screen.queryByText('d: 123')).not.toBeInTheDocument();
    expect(screen.queryByText('n: 456')).not.toBeInTheDocument();
    await user.type(screen.getByLabelText('d:'), '123');
    await user.type(screen.getByLabelText('n:'), '456');
    await user.click(screen.getByText('Submit'));
    expect(screen.queryByText("your private key")).not.toBeInTheDocument();
    expect(screen.queryByText('d: 123')).toBeInTheDocument();
    expect(screen.queryByText('n: 456')).toBeInTheDocument();
  });

  it('should ensure both d and n are entered', async () => {
    render(<EnterPrivateKey updatePrivateKey={jest.fn()} />);
    const user = userEvent.setup();
    expect(screen.queryByText("your private key")).toBeInTheDocument();
    await user.type(screen.getByLabelText('d:'), '789');
    await user.click(screen.getByText('Submit'));
    expect(screen.queryByText("your private key")).toBeInTheDocument();
    await user.clear(screen.getByLabelText('d:'));
    await user.type(screen.getByLabelText('n:'), '101');
    await user.click(screen.getByText('Submit'));
    expect(screen.queryByText("your private key")).toBeInTheDocument();
    await user.type(screen.getByLabelText('d:'), '789');
    await user.click(screen.getByText('Submit'));
    expect(screen.queryByText("your private key")).not.toBeInTheDocument();
  });

  it('should reject inputs that are not positive integers', async () => {
    render(<EnterPrivateKey updatePrivateKey={jest.fn()} />);
    const user = userEvent.setup();
    const enterKey = screen.queryByText("your private key");
    const dInput = screen.getByLabelText('d:');
    const nInput = screen.getByLabelText('n:');
    const submit = screen.getByText('Submit');

    await user.type(dInput, 'abc');
    await user.type(nInput, 'def');
    await user.click(submit);
    expect(enterKey).toBeInTheDocument();

    await user.clear(dInput);
    await user.clear(nInput);
    await user.click(dInput);
    await user.paste('-20');
    await user.type(nInput, '0');
    await user.click(submit);
    expect(enterKey).toBeInTheDocument();

    await user.clear(dInput);
    await user.clear(nInput);
    await user.type(dInput, '2.5');
    await user.click(nInput);
    await user.paste('6.09');
    await user.click(submit);
    expect(enterKey).toBeInTheDocument();

    await user.clear(dInput);
    await user.clear(nInput);
    await user.type(dInput, '999');
    await user.type(nInput, '888');
    await user.click(submit);
    expect(enterKey).not.toBeInTheDocument();
    expect(screen.queryByText('d: 999')).toBeInTheDocument();
    expect(screen.queryByText('n: 888')).toBeInTheDocument();
  });

  it('should inform the parent of the entered values', async () => {
    const updatePrivateKey = jest.fn();
    render(<EnterPrivateKey updatePrivateKey={updatePrivateKey} />);
    const user = userEvent.setup();
    await user.type(screen.getByLabelText('d:'), '14');
    await user.type(screen.getByLabelText('n:'), '25');
    await user.click(screen.getByText('Submit'));
    expect(updatePrivateKey).toHaveBeenCalledWith({ d: 14, n: 25 });
  });
});
