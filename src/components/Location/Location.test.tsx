import React from 'react';
import { render, screen,cleanup, fireEvent, waitFor } from '@testing-library/react';
import Location from  './Location'
import "@testing-library/jest-dom/extend-expect"

afterEach(cleanup)
// First Sample Test
test('Sample Test', () => {
  render(<Location />);
  const linkElement = screen.getByText(/Please Select A Residence ID/i);
  expect(linkElement).toBeInTheDocument();
});

// Test That Search Button is valid
test('vTest For Search Button', () => {
  const {getByTestId} = render(<Location />);
  // eslint-disable-next-line testing-library/prefer-screen-queries
  const loadBtn = getByTestId("btnLoadData")
  // Check That the Button Exist
  expect(loadBtn).toBeInTheDocument();
  //Check that the button contain the Text Searh
  expect(loadBtn.textContent).toContain("Search");
});


// Test That Input Field is valid
test('Input Field Test', () => {
  const {getByTestId} = render(<Location />);
  // eslint-disable-next-line testing-library/prefer-screen-queries
  const inputField= getByTestId("inputLoadData")
  // Check That the Input Field Exist
  expect(inputField).toBeInTheDocument();
  //Check that the input field is empty initially
  expect(inputField).toHaveDisplayValue("");
});


// Test That Input field can change its values
test('Input Field can change', async () => {
  const {getByTestId} = render(<Location />);
  // eslint-disable-next-line testing-library/prefer-screen-queries
  const inputField= getByTestId("inputLoadData")
  // Check That the Input Field Exist
   fireEvent.change(inputField,{
     target:{
       value : "10"
     }
   });

    await waitFor(() => expect(inputField).toHaveDisplayValue('10'));
});



// Test That Button was click without an Input
test('Button was click without Input', async () => {
  const {getByTestId} = render(<Location />);

  // eslint-disable-next-line testing-library/prefer-screen-queries
  const loadBtn = getByTestId("btnLoadData")

  // eslint-disable-next-line testing-library/prefer-screen-queries
  const wrongInput = getByTestId("textwronginput")

   // Click the Button without an Input
   fireEvent.click(loadBtn);

   await waitFor(() => expect(wrongInput.textContent).toContain("Please Enter A Resident ID"));
});
