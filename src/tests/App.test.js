import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import App from "../App";

it("can navigate the site by clicking links", () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );
  const homeStr = "Grizzco Industries";
  expect(screen.getByRole("heading", { name: homeStr })).toBeInTheDocument();

  const shopLink = screen.getByRole("link", { name: "Shop" });
  const homeLink = screen.getByRole("link", { name: "Grizzco" });
  const cartLink = screen.getByRole("link", { name: /Cart/i });

  userEvent.click(shopLink);
  const shopHeader = screen.getByRole("heading", { name: "Spend money" });
  expect(shopHeader).toBeInTheDocument();
  expect(
    screen.queryByRole("heading", { name: homeStr })
  ).not.toBeInTheDocument();

  userEvent.click(cartLink);
  const cartHeader = screen.getByRole("heading", { name: /Your items/i });
  expect(cartHeader).toBeInTheDocument();
  expect(shopHeader).not.toBeInTheDocument();

  userEvent.click(homeLink);
  expect(screen.getByRole("heading", { name: homeStr })).toBeInTheDocument();
  expect(cartHeader).not.toBeInTheDocument();
});

//currently performing this test by rendering the app and using it the way a user would
//while checking to make sure the value displayed in the nav bar is correct
//this involves navigating to the shop page and testing
//SEPARATE THE FGOLLOWING TEST INTO TESTING THE INPUT FIELD AND THEN THE INCREMENT / DECREMENT BUTTONS
// ***YOU SHOULD ALSO TEST THE INDIVIDUAL COMPONENT AND SEE IF IT FUNCTIONS PROPERLY
it("renders the amount of items in a user's shopping kart in the navbar", () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );
  const cartAmount = screen.getByTestId("total-item-amount");
  expect(cartAmount.textContent).toBe("0");

  const shopLink = screen.getByRole("link", { name: "Shop" });
  userEvent.click(shopLink);

  const itemLink = screen.getAllByRole("link", { name: "item-link" });
  userEvent.click(itemLink);

  const amountInputField = screen.getByLabelText("Quantity");
  userEvent.type(amountInputField, "10");
  expect(cartAmount.textContent).toBe("10");
});
