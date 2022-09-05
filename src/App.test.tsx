import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import App from './App';

afterEach(cleanup)
test('Sample Test', () => {
  render(<App />);
  const linkElement = screen.getByText(/Please Select A Residence ID/i);
  expect(linkElement).toBeInTheDocument();
});
