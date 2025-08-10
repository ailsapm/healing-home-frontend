import React from "react";
import { render, screen } from "@testing-library/react";
import HomePage from "./HomePage";

//mock UserContext provider so user is available
import { UserContext } from "../contexts/UserContext";

test("renders 'with love and light' in the homepage welcome text", () => {
  const mockUser = { username: "testuser" };

  render(
    <UserContext.Provider value={{ user: mockUser }}>
      <HomePage />
    </UserContext.Provider>
  );

  //check if the phrase With love and light is in the document
  const textElement = screen.getByText(/With love and light/i);
  expect(textElement).toBeInTheDocument();
});
