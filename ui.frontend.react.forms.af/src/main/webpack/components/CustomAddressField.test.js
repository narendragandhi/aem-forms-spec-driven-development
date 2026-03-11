import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import CustomAddressField from './CustomAddressField';

// Mock the 'Field' wrapper from the SDK if needed, 
// or test the underlying CustomAddressField component directly.
// For TDD, we test the functional requirements.

describe('CustomAddressField', () => {
  const defaultProps = {
    label: 'Mailing Address',
    description: 'Enter your full street address',
    name: 'address',
    id: 'address-123',
    visible: true,
    enabled: true,
    value: ''
  };

  test('renders correctly with label and placeholder', () => {
    render(<CustomAddressField {...defaultProps} />);
    
    expect(screen.getByText('Mailing Address')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Start typing your address...')).toBeInTheDocument();
    expect(screen.getByText('Enter your full street address')).toBeInTheDocument();
  });

  test('updates input value on change', () => {
    render(<CustomAddressField {...defaultProps} />);
    const input = screen.getByPlaceholderText('Start typing your address...');
    
    fireEvent.change(input, { target: { value: '123 Main St' } });
    expect(input.value).toBe('123 Main St');
  });

  test('is disabled when enabled prop is false', () => {
    render(<CustomAddressField {...defaultProps} enabled={false} />);
    const input = screen.getByPlaceholderText('Start typing your address...');
    
    expect(input).toBeDisabled();
  });

  test('does not render when visible prop is false', () => {
    const { container } = render(<CustomAddressField {...defaultProps} visible={false} />);
    expect(container.firstChild).toBeNull();
  });
});
