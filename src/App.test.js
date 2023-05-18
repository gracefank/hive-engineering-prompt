import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders mutliselect example", () => {
  render(<App />);
  const selectTitle = screen.getByText(/Multi-Select Example/i);
  expect(selectTitle).toBeInTheDocument();
});

test("renders single select example", () => {
  render(<App />);
  const selectTitle = screen.getByText(/Single-Select Example/i);
  expect(selectTitle).toBeInTheDocument();
});
