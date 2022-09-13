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

afterEach(cleanup);

test("vTest For Search Button", () => {
  const { getByTestId } = render(<Location />);
  // eslint-disable-next-line testing-library/prefer-screen-queries
  const loadBtn = getByTestId("btnLoadData");
  // Check That the Button Exist
  expect(loadBtn).toBeInTheDocument();
  //Check that the button contain the Text Searh
  expect(loadBtn.textContent).toContain("Search");
});

test("Input Field Test", () => {
  const { getByTestId } = render(<Location />);
  // eslint-disable-next-line testing-library/prefer-screen-queries
  const inputField = getByTestId("inputLoadData");
  // Check That the Input Field Exist
  expect(inputField).toBeInTheDocument();
  //Check that the input field is empty initially
  expect(inputField).toHaveDisplayValue("");
});

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
    expect(wrongInput.textContent).toBe("Please Enter A Resident ID")
  );
});

test("Button was trigger with a valid Input", async () => {
  mock
    .onGet("https://api-dev.trysolstice.com/v1/households/10")
    .reply(200, getmockresult(200));
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
  // eslint-disable-next-line testing-library/no-wait-for-side-effects
  fireEvent.click(loadBtn);

  await waitFor(() => {
    expect(screen.getByText(/Address/i)).toBeInTheDocument();
  });
});

test("should handle failed response", async () => {
  // mock axios call to response failure

  mock
    .onGet("https://api-dev.trysolstice.com/v1/households/8")
    .reply(404, getmockresult(404));

  const { getByTestId } = render(<Location />);

  // eslint-disable-next-line testing-library/prefer-screen-queries
  const loadBtn = getByTestId("btnLoadData");

  // eslint-disable-next-line testing-library/prefer-screen-queries
  const inputField = getByTestId("inputLoadData");

  fireEvent.change(inputField, {
    target: {
      value: "8",
    },
  });

  // Click the Button without an Input
  // eslint-disable-next-line testing-library/no-wait-for-side-effects
  fireEvent.click(loadBtn);

  await waitFor(() => {
    expect(screen.getByText(/Household Not Found/i)).toBeInTheDocument();
  });
});
