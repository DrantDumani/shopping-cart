import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import Item from "../Item";

it("calls the click handler function when user clicks link", () => {
  const clickMock = jest.fn();
  const fakeDB = [{ id: "notReal" }];
  render(
    <MemoryRouter>
      <Item clickHandler={clickMock} db={fakeDB} />
    </MemoryRouter>
  );
  const link = screen.getByRole("link", { name: "Add to Cart" });

  userEvent.click(link);
  expect(clickMock).toBeCalled();
});

it("updates the numerical value of the quantity field when user types in a number and cannot accept more than 3 digits", () => {
  const fakeDB = [{ id: "notReal" }];
  render(
    <MemoryRouter>
      <Item db={fakeDB} />
    </MemoryRouter>
  );

  const quantity = screen.getByLabelText(/quantity/i);
  expect(quantity.value).toBe("1");
  userEvent.type(quantity, "2S39");

  expect(quantity.value).toBe("123");
});

describe("increment and decrement buttons", () => {
  it("increases value of quantity field by one when clicked", () => {
    const fakeDB = [{ id: "notReal" }];
    render(
      <MemoryRouter>
        <Item db={fakeDB} />
      </MemoryRouter>
    );
    const quantity = screen.getByLabelText(/quantity/i);
    const incBtn = screen.getByRole("button", { name: "+" });

    userEvent.click(incBtn);
    userEvent.click(incBtn);
    expect(quantity.value).toBe("3");
  });

  it("decreases value of quantity field by one when clicked", () => {
    const fakeDB = [{ id: "notReal" }];
    render(
      <MemoryRouter>
        <Item db={fakeDB} />
      </MemoryRouter>
    );
    const quantity = screen.getByLabelText(/quantity/i);
    userEvent.type(quantity, "20");

    const decBtn = screen.getByRole("button", { name: "-" });
    for (let i = 0; i < 3; i++) {
      userEvent.click(decBtn);
    }
    expect(quantity.value).toBe("117");
  });

  it("cannot decrease value to number lower than one", () => {
    const fakeDB = [{ id: "notReal" }];
    render(
      <MemoryRouter>
        <Item db={fakeDB} />
      </MemoryRouter>
    );
    const quantity = screen.getByLabelText(/quantity/i);
    const decBtn = screen.getByRole("button", { name: "-" });
    for (let i = 0; i < 3; i++) {
      userEvent.click(decBtn);
    }

    expect(quantity.value).toBe("1");
  });

  it("correctly operates on numerical value in quantity field", () => {
    const fakeDB = [{ id: "notReal" }];
    render(
      <MemoryRouter>
        <Item db={fakeDB} />
      </MemoryRouter>
    );
    const quantity = screen.getByLabelText(/quantity/i);
    const incBtn = screen.getByRole("button", { name: "+" });

    userEvent.type(quantity, "2");
    userEvent.click(incBtn);
    expect(quantity.value).toBe("13");
  });
});

// describe("input functions on Item page", () => {
//   it("calls fn correct number of times", () => {
//     const inputMock = jest.fn();
//     render(
//       <MemoryRouter>
//         <Item changeHandler={inputMock} />
//       </MemoryRouter>
//     );
//     const input = screen.getByRole("spinbutton", { name: /Quantity/ });
//     userEvent.type(input, "3333");
//     expect(inputMock).toHaveBeenCalledTimes(4);
//   });

//   it("only calls fn when user types in a number", () => {
//     const inputMock = jest.fn();
//     render(
//       <MemoryRouter>
//         <Item changeHandler={inputMock} />
//       </MemoryRouter>
//     );
//     const input = screen.getByRole("spinbutton", { name: /Quantity/ });
//     userEvent.type(input, "S3");

//     expect(inputMock).toBeCalledTimes(1);
//   });
// });

// describe("functions called when clicking buttons", () => {
//   it("calls incHandler when plus button is called", () => {
//     const incMock = jest.fn();
//     render(
//       <MemoryRouter>
//         <Item incHandler={incMock} />
//       </MemoryRouter>
//     );
//     const incBtn = screen.getByRole("button", { name: "+" });
//     userEvent.click(incBtn);
//     expect(incMock).toBeCalled();
//   });

//   it("calls decHandler when minus button is called", () => {
//     const decMock = jest.fn();
//     render(
//       <MemoryRouter>
//         <Item incHandler={decMock} />
//       </MemoryRouter>
//     );
//     const decBtn = screen.getByRole("button", { name: "+" });
//     userEvent.click(decBtn);
//     expect(decMock).toBeCalled();
//   });
// });
