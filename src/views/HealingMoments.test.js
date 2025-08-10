import React from 'react';
import { render, screen } from '@testing-library/react';
import HealingMoments from './HealingMoments';

//totally basic test to see if HealingMoments component renders the Guided Meditations title
test('renders Guided Meditations section', () => {
  //render the HealingMoments component into a virtual DOM
  render(<HealingMoments />);

  //check if "Guided Meditations" heading is present in the document
  const headingElement = screen.getByText(/Guided Meditations/i);
  expect(headingElement).toBeInTheDocument();
});
