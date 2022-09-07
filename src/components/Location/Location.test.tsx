import React from "react";
import {
  render,
  screen,
  cleanup,
  fireEvent,
  waitFor,
} from "@testing-library/react";
import Location from "./Location";
import "@testing-library/jest-dom/extend-expect";
import getmockresult from "../../__mock__/axios";

var axios = require("axios");
var MockAdapter = require("axios-mock-adapter");

// This sets the mock adapter on the default instance
var mock = new MockAdapter(axios);

// Mock any GET request to /users
// arguments for reply are (status, data, headers)
mock.onGet("https://api-dev.trysolstice.com/v1/households/10").reply(200, getmockresult(200));

afterEach(cleanup);
// Test That Search Button is valid
test("vTest For Search Button", () => {
  const { getByTestId } = render(<Location />);
  // eslint-disable-next-line testing-library/prefer-screen-queries
  const loadBtn = getByTestId("btnLoadData");
  // Check That the Button Exist
  expect(loadBtn).toBeInTheDocument();
  //Check that the button contain the Text Searh
  expect(loadBtn.textContent).toContain("Search");
});

// Test That Input Field is valid
test("Input Field Test", () => {
  const { getByTestId } = render(<Location />);
  // eslint-disable-next-line testing-library/prefer-screen-queries
  const inputField = getByTestId("inputLoadData");
  // Check That the Input Field Exist
  expect(inputField).toBeInTheDocument();
  //Check that the input field is empty initially
  expect(inputField).toHaveDisplayValue("");
});

// Test That Input field can change its values
test("Input Field can change", async () => {
  const { getByTestId } = render(<Location />);
  // eslint-disable-next-line testing-library/prefer-screen-queries
  const inputField = getByTestId("inputLoadData");
  // Check That the Input Field Exist
  fireEvent.change(inputField, {
    target: {
      value: "10",
    },
  });

  await waitFor(() => expect(inputField).toHaveDisplayValue("10"));
});

// Test That Button was click without an Input
test("Button was click without Input", async () => {
  const { getByTestId } = render(<Location />);

  // eslint-disable-next-line testing-library/prefer-screen-queries
  const loadBtn = getByTestId("btnLoadData");

  // eslint-disable-next-line testing-library/prefer-screen-queries
  const wrongInput = getByTestId("textwronginput");

  // Click the Button without an Input
  fireEvent.click(loadBtn);

  await waitFor(() =>
    expect(wrongInput.textContent).toContain("Please Enter A Resident ID")
  );
});

// Test That Search lost focus without an imput
test("Search Lost Focus without an Input", async () => {
  const { getByTestId } = render(<Location />);

  // eslint-disable-next-line testing-library/prefer-screen-queries
  const inputField = getByTestId("inputLoadData");

  // eslint-disable-next-line testing-library/prefer-screen-queries
  const wrongInput = getByTestId("textwronginput");

  // The Input Field has gotten focus
  fireEvent.focusIn(inputField);

  // The Input Field has lost focus
  fireEvent.focusOut(inputField);

  await waitFor(() =>
    expect(wrongInput.textContent).toBe(" Please Enter A Resident ID")
  );
});

// Test That Button was click with a valid Input And get a valid result
test("Button was trigger with a valid Input", async () => {
  const { getByTestId } = render(<Location />);

  // eslint-disable-next-line testing-library/prefer-screen-queries
  const loadBtn = getByTestId("btnLoadData");

  // eslint-disable-next-line testing-library/prefer-screen-queries
  const inputField = getByTestId("inputLoadData");

  fireEvent.change(inputField, {
    target: {
      value: "10",
    },
  });

  // Click the Button without an Input
  fireEvent.click(loadBtn);

  await expect(screen.getByText(/Loading/i)).toBeInTheDocument();

  await waitFor(() => {
    axios
      .get("https://api-dev.trysolstice.com/v1/households/10")
      .then(function (response:any) {
        expect(response.status).toEqual(200);
      });
  });

  await waitFor(() => {
    expect(screen.getByText(/Address/i)).toBeInTheDocument();
  });
});
