import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ReportButton from './ReportButton';

describe('ReportButton component', () => {
  it('renders button with default text content', () => {
    const { getByText } = render(<ReportButton />);
    const buttonElement = getByText('Report');
    expect(buttonElement).toBeInTheDocument();
  });

  it('calls onPress handler when button is clicked', () => {
    const handleClick = jest.fn();
    const { getByText } = render(<ReportButton onPress={handleClick} />);
    const buttonElement = getByText('Report');
    fireEvent.click(buttonElement);
    expect(handleClick).toHaveBeenCalled();
  });

  it('applies custom text color to button', () => {
    const customTextColor = '#ffffff'; // White color
    const { container } = render(<ReportButton color={customTextColor} />);
    const buttonElement = container.querySelector('button');
    expect(buttonElement).toHaveStyle('color: #ffffff');
  });
});
