import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";

it("can navigate the site by clicking links", () => {
  render(<App />);
  const homeStr = "Grizzco Industries";
  const homeHeader = screen.getByRole("heading", {
    name: homeStr,
  });
  expect(homeHeader).toBeInTheDocument();

  const shopLink = screen.getByRole("link", { name: "Shop" });
  const homeLink = screen.getByRole("link", { name: "Grizzco" });
  const cartLink = screen.getByRole("link", { name: /Cart/i });

  userEvent.click(shopLink);
  const shopHeader = screen.getByRole("heading", { name: "Spend money" });
  expect(shopHeader).toBeInTheDocument();
  expect(homeHeader).not.toBeInTheDocument();

  userEvent.click(cartLink);
  const cartHeader = screen.getByRole("heading", { name: /Your items/i });
  expect(cartHeader).toBeInTheDocument();
  expect(shopHeader).not.toBeInTheDocument();

  userEvent.click(homeLink);
  const backToHomeHeader = screen.getByRole("heading", {
    name: homeStr,
  });
  expect(backToHomeHeader).toBeInTheDocument();
  expect(cartHeader).not.toBeInTheDocument();
});

// test("The number of items in the user's shopping kart is displayed in the navbar shopping kart link", () => {
//   //This test should check that a user's kart number starts at zero and goes up by 1 for every item they add
//   //Also, consider moving this whole thing to navbar tests. Will that still work? I dunno, man just try it out
// });
