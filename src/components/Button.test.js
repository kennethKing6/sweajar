import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Button from './Button';
import { Colors } from '../assets/colors';
import { ButtonStyles } from '../assets/ButtonStyles';

describe('Button Component', () => {
    it('renders with default text', () => {
        const { getByText } = render(<Button />);
        const buttonText = getByText('Button');
        expect(buttonText).toBeInTheDocument();
      });

    // it('renders with custom text', () => {
    //   const customText = 'Custom Button';
    //   const { getByText } = render(<Button text={customText} />);
    //   const buttonText = getByText(customText);
    //   expect(buttonText).toBeInTheDocument();
    // });
    
    it('calls onPress function when clicked', () => {
      const onPress = jest.fn();
      const { getByText } = render(<Button onPress={onPress} />);
      const button = getByText('Button');
      fireEvent.click(button);
      expect(onPress).toHaveBeenCalled();
    });
});
