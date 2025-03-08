/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

// A simple test to verify Jest is working
describe('Jest Setup', () => {
  it('should work', () => {
    render(<div data-testid="test">Test</div>);
    expect(screen.getByTestId('test')).toBeInTheDocument();
  });
}); 