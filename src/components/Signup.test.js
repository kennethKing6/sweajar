import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import Signup from './Signup';
import { User } from '../model/User';

jest.mock('../model/User', () => ({
  User: {
    createAccount: jest.fn(),
  },
}));

global.alert = jest.fn();
jest.setTimeout(10000);
describe('Signup Component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    render(<Signup />);
  });

  it('updates state on input change', () => {
    const { getByLabelText } = render(<Signup />);
    const firstNameInput = getByLabelText('First Name');
    const lastNameInput = getByLabelText('Last Name');
    const emailInput = getByLabelText('Email');
    const passwordInput = getByLabelText('Password');

    fireEvent.change(firstNameInput, { target: { value: 'John' } });
    fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'testpassword' } });

    expect(firstNameInput.value).toBe('John');
    expect(lastNameInput.value).toBe('Doe');
    expect(emailInput.value).toBe('test@example.com');
    expect(passwordInput.value).toBe('testpassword');
  });

  it('calls createAccount function on form submission', async () => {
    const { getByLabelText, getByRole } = render(<Signup />);
    const firstNameInput = getByLabelText('First Name');
    const lastNameInput = getByLabelText('Last Name');
    const emailInput = getByLabelText('Email');
    const passwordInput = getByLabelText('Password');
    const signUpButton = getByRole('button', { name: 'Sign Up' });

    fireEvent.change(firstNameInput, { target: { value: 'John' } });
    fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'testpassword' } });
    fireEvent.click(signUpButton);

    await waitFor(() => {
      expect(User.createAccount).toHaveBeenCalledWith({
        email: 'test@example.com',
        firstName: 'John',
        lastName: 'Doe',
        password: 'testpassword',
      });
    });
  });

//   it('displays error message if createAccount function throws an error', async () => {
//     const errorMessage = 'Error: Account creation failed';
//     User.createAccount.mockRejectedValueOnce(new Error(errorMessage));
  
//     const { getByRole, container } = render(<Signup />);
//     const signUpButton = getByRole('button', { name: 'Sign Up' });

//     fireEvent.click(signUpButton);
  
//     await waitFor(() => {
//       const errorElement = container.querySelector(`[aria-label="${errorMessage}"]`);
//       expect(errorElement).toBeInTheDocument();
//     });
//   });
  
});
