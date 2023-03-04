import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders sam 'n cookies header", () => {
  render(<App />);
  const linkElement = screen.getByText(/sam 'n cookies/i);
  expect(linkElement).toBeInTheDocument();
});
