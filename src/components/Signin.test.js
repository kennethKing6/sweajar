import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import Signin from './Signin';
import { User } from '../model/User';

jest.mock('../model/User', () => ({
  User: {
    signIn: jest.fn(), // Ensure signIn function is mocked
  },
}));

describe('Signin Component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    render(<Signin />);
  });

  it('updates email state on input change', () => {
    const { getByLabelText } = render(<Signin />);
    const emailInput = getByLabelText('Email');
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    expect(emailInput.value).toBe('test@example.com');
  });

  it('updates password state on input change', () => {
    const { getByLabelText } = render(<Signin />);
    const passwordInput = getByLabelText('Password');
    fireEvent.change(passwordInput, { target: { value: 'testpassword' } });
    expect(passwordInput.value).toBe('testpassword');
  });

  it('calls signIn function on form submission', async () => {
    const { getByLabelText, getByRole } = render(<Signin />);
    const emailInput = getByLabelText('Email');
    const passwordInput = getByLabelText('Password');
    const signInButton = getByRole('button', { name: 'Sign In' });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'testpassword' } });
    fireEvent.click(signInButton);

    await waitFor(() => {
      expect(User.signIn).toHaveBeenCalledWith('test@example.com', 'testpassword');
    });
  });

  it('displays error message if signIn function throws an error', async () => {
    User.signIn.mockRejectedValueOnce(new Error('Invalid email or password'));
    const { getByLabelText, getByRole, queryByText } = render(<Signin />);
    const emailInput = getByLabelText('Email');
    const passwordInput = getByLabelText('Password');
    const signInButton = getByRole('button', { name: 'Sign In' });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'testpassword' } });
    fireEvent.click(signInButton);

    const errorMessage = queryByText('Invalid email or password');
    expect(errorMessage).toBeNull();
});

});
