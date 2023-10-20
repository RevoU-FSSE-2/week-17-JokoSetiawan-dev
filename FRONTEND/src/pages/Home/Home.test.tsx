import React from "react";
import { render, screen } from "@testing-library/react";
import HomePage from ".";

jest.mock("react-router-dom", () => ({
  useNavigate: () => jest.fn(),
}));

describe("HomePage Component", () => {
  beforeEach(() => {
    localStorage.setItem("authToken", "mockToken");
  });

  afterEach(() => {
    localStorage.clear();
  });

  it("renders a table", () => {
    render(<HomePage data={[]} />);

    const table = screen.getByRole("table");
    expect(table).toBeDefined();
  });

  it("renders the AddDataButton component", () => {
    render(<HomePage data={[]} />);

    const addDataButton = screen.getByText("Add New Data");
    expect(addDataButton).toBeDefined();
  });
});
