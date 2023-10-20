import React from "react";
import { render, screen } from "@testing-library/react";
import NewCategory from ".";

jest.mock("react-router-dom", () => ({
    useNavigate: () => jest.fn(),
  }));

describe("NewCategory Component", () => {
  it("renders the form with the name input field and submit button", () => {
    render(<NewCategory />);

    // Check if the name input field is present
    const nameInput = screen.getByText("Name");
    expect(nameInput).toBeDefined();

    // Check if the submit button is present
    const addButton = screen.getByRole("button", { name: "Add" });
    expect(addButton).toBeDefined();
  });
});
