import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import EnterPublicKey from './EnterPublicKey';

describe('EnterPublicKey', () => {
  it('should display the form before user submission and the keys after', async () => {
    render(<EnterPublicKey updatePublicKey={jest.fn()} />);
    const user = userEvent.setup();
    expect(screen.queryByText("recipient's public key")).toBeInTheDocument();
    expect(screen.queryByText('n: 357')).not.toBeInTheDocument();
    expect(screen.queryByText('e: 468')).not.toBeInTheDocument();
    await user.type(screen.getByLabelText('n:'), '357');
    await user.type(screen.getByLabelText('e:'), '468');
    await user.click(screen.getByText('Submit'));
    expect(screen.queryByText("recipient's public key")).not.toBeInTheDocument();
    expect(screen.queryByText('n: 357')).toBeInTheDocument();
    expect(screen.queryByText('e: 468')).toBeInTheDocument();
  });

  it('should ensure both n and e are entered', async () => {
    render(<EnterPublicKey updatePublicKey={jest.fn()} />);
    const user = userEvent.setup();
    expect(screen.queryByText("recipient's public key")).toBeInTheDocument();
    await user.type(screen.getByLabelText('n:'), '579');
    await user.click(screen.getByText('Submit'));
    expect(screen.queryByText("recipient's public key")).toBeInTheDocument();
    await user.clear(screen.getByLabelText('n:'));
    await user.type(screen.getByLabelText('e:'), '680');
    await user.click(screen.getByText('Submit'));
    expect(screen.queryByText("recipient's public key")).toBeInTheDocument();
    await user.type(screen.getByLabelText('n:'), '579');
    await user.click(screen.getByText('Submit'));
    expect(screen.queryByText("recipient's public key")).not.toBeInTheDocument();
  });

  it('should reject inputs that are not positive integers under 9 million', async () => {
    render(<EnterPublicKey updatePublicKey={jest.fn()} />);
    const user = userEvent.setup();
    const enterKey = screen.queryByText("recipient's public key");
    const nInput = screen.getByLabelText('n:');
    const eInput = screen.getByLabelText('e:');
    const submit = screen.getByText('Submit');

    await user.type(nInput, 'abc');
    await user.type(eInput, 'def');
    await user.click(submit);
    expect(enterKey).toBeInTheDocument();

    await user.clear(nInput);
    await user.clear(eInput);
    await user.click(nInput);
    await user.paste('-20');
    await user.type(eInput, '0');
    await user.click(submit);
    expect(enterKey).toBeInTheDocument();

    await user.clear(nInput);
    await user.clear(eInput);
    await user.type(nInput, '2.5');
    await user.click(eInput);
    await user.paste('6.09');
    await user.click(submit);
    expect(enterKey).toBeInTheDocument();

    await user.clear(eInput);
    await user.clear(nInput);
    await user.type(eInput, '255251');
    await user.click(nInput);
    await user.paste('9000009');
    await user.click(submit);
    expect(enterKey).toBeInTheDocument();

    await user.clear(nInput);
    await user.clear(eInput);
    await user.type(nInput, '999');
    await user.type(eInput, '888');
    await user.click(submit);
    expect(enterKey).not.toBeInTheDocument();
    expect(screen.queryByText('n: 999')).toBeInTheDocument();
    expect(screen.queryByText('e: 888')).toBeInTheDocument();
  });

  it('should inform the parent of the entered values', async () => {
    const updatePublicKey = jest.fn();
    render(<EnterPublicKey updatePublicKey={updatePublicKey} />);
    const user = userEvent.setup();
    await user.type(screen.getByLabelText('n:'), '14');
    await user.type(screen.getByLabelText('e:'), '25');
    await user.click(screen.getByText('Submit'));
    expect(updatePublicKey).toHaveBeenCalledWith({ n: 14, e: 25 });
  });
});
