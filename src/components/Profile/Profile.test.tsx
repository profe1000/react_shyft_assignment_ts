import React from "react";
import { render, screen, cleanup, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import getmockresult from "../../__mock__/axios";
import Profile from "./Profile";

var axios = require("axios");
var MockAdapter = require("axios-mock-adapter");

// This sets the mock adapter on the default instance
var mock = new MockAdapter(axios);

// Mock any GET request to /users
// arguments for reply are (status, data, headers)

afterEach(cleanup);

test("should handle successful Profile api call", async () => {
  mock
    .onGet("https://api-dev.trysolstice.com/v1/users/me")
    .reply(200, getmockresult(201));
  const { getByTestId } = render(<Profile />);

  await waitFor(() => {
    expect(screen.getByText(/Welcome/i)).toBeInTheDocument();
  });
});

test("should handle failed Profile api call", async () => {
  // mock axios call to response failure

  mock
    .onGet("https://api-dev.trysolstice.com/v1/users/me")
    .reply(0, getmockresult(404));

  const { getByTestId } = render(<Profile />);

  await waitFor(() => {
    expect(screen.getByText(/No Internet Connection/i)).toBeInTheDocument();
  });
});
