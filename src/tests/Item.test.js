import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import Item from "../Item";

it("calls the click handler function when user clicks link", () => {
  const clickMock = jest.fn();
  render(
    <MemoryRouter>
      <Item clickHandler={clickMock} />
    </MemoryRouter>
  );
  const link = screen.getByRole("link", { name: "Add to Cart" });

  userEvent.click(link);
  expect(clickMock).toBeCalled();
});

describe("input functions on Item page", () => {
  it("calls fn correct number of times", () => {
    const inputMock = jest.fn();
    render(
      <MemoryRouter>
        <Item changeHandler={inputMock} />
      </MemoryRouter>
    );
    const input = screen.getByRole("spinbutton", { name: /Quantity/ });
    userEvent.type(input, "3333");
    expect(inputMock).toHaveBeenCalledTimes(4);
  });

  it("only calls fn when user types in a number", () => {
    const inputMock = jest.fn();
    render(
      <MemoryRouter>
        <Item changeHandler={inputMock} />
      </MemoryRouter>
    );
    const input = screen.getByRole("spinbutton", { name: /Quantity/ });
    userEvent.type(input, "S3");

    expect(inputMock).toBeCalledTimes(1);
  });
});

describe("functions called when clicking buttons", () => {
  it("calls incHandler when plus button is called", () => {
    const incMock = jest.fn();
    render(
      <MemoryRouter>
        <Item incHandler={incMock} />
      </MemoryRouter>
    );
    const incBtn = screen.getByRole("button", { name: "+" });
    userEvent.click(incBtn);
    expect(incMock).toBeCalled();
  });

  it("calls decHandler when minus button is called", () => {
    const decMock = jest.fn();
    render(
      <MemoryRouter>
        <Item incHandler={decMock} />
      </MemoryRouter>
    );
    const decBtn = screen.getByRole("button", { name: "+" });
    userEvent.click(decBtn);
    expect(decMock).toBeCalled();
  });
});
