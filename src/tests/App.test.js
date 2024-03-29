import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import App from "../App";

describe("site navigation", () => {
  it("can navigate the site by clicking links in navbar", () => {
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

  it("can navigate to an item page by clicking a link on the shop page", () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    const shopLink = screen.getByRole("link", { name: "Shop" });
    userEvent.click(shopLink);
    const itemLink = screen.getAllByRole("link", { name: "item-link" });
    userEvent.click(itemLink[0]);
    expect(
      screen.getByRole("link", { name: "Add to Cart" })
    ).toBeInTheDocument();
  });

  it("navigates to the shopping kart after clicking the 'Add to Cart' link'", () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    const shopLink = screen.getByRole("link", { name: "Shop" });
    userEvent.click(shopLink);

    const itemLink = screen.getAllByRole("link", { name: "item-link" });
    userEvent.click(itemLink[0]);

    const addToCart = screen.getByRole("link", { name: "Add to Cart" });
    userEvent.click(addToCart);

    expect(
      screen.getByRole("heading", { name: /Your items/i })
    ).toBeInTheDocument();
  });

  it("can navigate from link on homepage to shop page", () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    const homeShopLink = screen.getByRole("link", {
      name: "Ready to become a part of something bigger than yourself?",
    });
    userEvent.click(homeShopLink);

    const shopHeader = screen.getByRole("heading", { name: "Spend money" });
    expect(shopHeader).toBeInTheDocument();
    expect(homeShopLink).not.toBeInTheDocument();
  });
});

it("displays purchased items on the shopping cart page", () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );

  const shopLink = screen.getByRole("link", { name: "Shop" });
  userEvent.click(shopLink);

  const itemLink = screen.getAllByRole("link", { name: "item-link" });
  userEvent.click(itemLink[0]);

  const name = screen.getByTestId("item-name").textContent;
  const quantity = screen.getByLabelText(/quantity/i).value;

  const addToCart = screen.getByRole("link", { name: "Add to Cart" });
  userEvent.click(addToCart);

  expect(screen.getByText(name)).toBeInTheDocument();
  expect(screen.getByLabelText(/quantity/i).value).toBe(quantity);
});

it("increases the quantity of an item in a user's cart instead of adding a duplicate entry", () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );

  const shopLink = screen.getByRole("link", { name: "Shop" });
  userEvent.click(shopLink);

  const itemLink = screen.getAllByRole("link", { name: "item-link" });
  userEvent.click(itemLink[0]);

  const addToCart = screen.getByRole("link", { name: "Add to Cart" });
  userEvent.click(addToCart);

  userEvent.click(shopLink);
  userEvent.click(screen.getAllByRole("link", { name: "item-link" })[0]);
  userEvent.click(screen.getByRole("link", { name: "Add to Cart" }));

  const quantityFields = screen.getAllByLabelText(/quantity/i);
  expect(quantityFields.length).toBe(1);
  expect(quantityFields[0].value).toBe("2");
});

it("updates the numerical value of the quantity field when user types in a number and cannot accept more than 3 digits", () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );

  const shopLink = screen.getByRole("link", { name: "Shop" });
  userEvent.click(shopLink);

  const itemLink = screen.getAllByRole("link", { name: "item-link" });
  userEvent.click(itemLink[0]);

  const addToCart = screen.getByRole("link", { name: "Add to Cart" });

  const quantity = screen.getByLabelText(/quantity/i);
  expect(quantity.value).toBe("1");
  userEvent.type(quantity, "2S39");

  expect(quantity.value).toBe("123");

  userEvent.click(addToCart);
  const cartPageQuantity = screen.getAllByLabelText(/quantity/i)[0];
  userEvent.type(cartPageQuantity, "9{backspace}");

  expect(cartPageQuantity.value).toBe("12");
});

it("removes item from the cart if value on cart page becomes 0", () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );

  const shopLink = screen.getByRole("link", { name: "Shop" });
  userEvent.click(shopLink);

  const itemLink = screen.getAllByRole("link", { name: "item-link" });
  userEvent.click(itemLink[0]);

  const addToCart = screen.getByRole("link", { name: "Add to Cart" });
  userEvent.click(addToCart);

  const cartPageQuantity = screen.getAllByLabelText(/quantity/i)[0];
  userEvent.type(cartPageQuantity, "{backspace}");

  expect(cartPageQuantity).not.toBeInTheDocument();
});

describe("increment and decrement buttons on item and cart pages", () => {
  it("increases value of quantity field by one when clicked", () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    const shopLink = screen.getByRole("link", { name: "Shop" });
    userEvent.click(shopLink);

    const itemLink = screen.getAllByRole("link", { name: "item-link" });
    userEvent.click(itemLink[0]);

    const addToCart = screen.getByRole("link", { name: "Add to Cart" });
    const quantity = screen.getByLabelText(/quantity/i);
    const incBtn = screen.getByRole("button", { name: "+" });

    userEvent.click(incBtn);
    userEvent.click(incBtn);
    expect(quantity.value).toBe("3");

    userEvent.click(addToCart);
    const cartIncBtns = screen.getAllByRole("button", { name: "+" });
    const cartPageQuantity = screen.getAllByLabelText(/quantity/i)[0];
    userEvent.click(cartIncBtns[0]);

    expect(cartPageQuantity.value).toBe("4");
  });

  it("decreases value of quantity field by one when clicked", () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    const shopLink = screen.getByRole("link", { name: "Shop" });
    userEvent.click(shopLink);

    const itemLink = screen.getAllByRole("link", { name: "item-link" });
    userEvent.click(itemLink[0]);

    const addToCart = screen.getByRole("link", { name: "Add to Cart" });
    const quantity = screen.getByLabelText(/quantity/i);
    userEvent.type(quantity, "20");

    const decBtn = screen.getByRole("button", { name: "-" });
    for (let i = 0; i < 3; i++) {
      userEvent.click(decBtn);
    }
    expect(quantity.value).toBe("117");

    userEvent.click(addToCart);
    const cartDecBtns = screen.getAllByRole("button", { name: "-" });
    const cartPageQuantity = screen.getAllByLabelText(/quantity/i)[0];

    userEvent.click(cartDecBtns[0]);
    expect(cartPageQuantity.value).toBe("116");
  });

  it("cannot decrease value to number lower than 1 on item page", () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    const shopLink = screen.getByRole("link", { name: "Shop" });
    userEvent.click(shopLink);

    const itemLink = screen.getAllByRole("link", { name: "item-link" });
    userEvent.click(itemLink[0]);

    const quantity = screen.getByLabelText(/quantity/i);
    const decBtn = screen.getByRole("button", { name: "-" });
    for (let i = 0; i < 3; i++) {
      userEvent.click(decBtn);
    }

    expect(quantity.value).toBe("1");
  });

  it("can reduce item quantity to 0 on cart page, removing the item from the cart", () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    const shopLink = screen.getByRole("link", { name: "Shop" });
    userEvent.click(shopLink);

    const itemLink = screen.getAllByRole("link", { name: "item-link" });
    userEvent.click(itemLink[0]);

    const addToCart = screen.getByRole("link", { name: "Add to Cart" });
    userEvent.click(addToCart);

    const cartDecBtn = screen.getAllByRole("button", { name: "-" })[0];
    userEvent.click(cartDecBtn);

    expect(cartDecBtn).not.toBeInTheDocument();
  });

  it("correctly operates on numerical value in quantity field", () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    const shopLink = screen.getByRole("link", { name: "Shop" });
    userEvent.click(shopLink);

    const itemLink = screen.getAllByRole("link", { name: "item-link" });
    userEvent.click(itemLink[0]);

    const quantity = screen.getByLabelText(/quantity/i);
    const incBtn = screen.getByRole("button", { name: "+" });
    const decBtn = screen.getByRole("button", { name: "-" });

    const addToCart = screen.getByRole("link", { name: "Add to Cart" });

    userEvent.type(quantity, "2");
    userEvent.click(incBtn);
    userEvent.click(incBtn);
    userEvent.click(decBtn);
    expect(quantity.value).toBe("13");

    userEvent.click(addToCart);
    const cartIncBtns = screen.getAllByRole("button", { name: "+" });
    const cartDecBtns = screen.getAllByRole("button", { name: "-" });
    const cartPageQuantity = screen.getAllByLabelText(/quantity/i)[0];

    userEvent.type(cartPageQuantity, "3");
    userEvent.click(cartDecBtns[0]);
    userEvent.click(cartDecBtns[0]);
    userEvent.click(cartIncBtns[0]);

    expect(cartPageQuantity.value).toBe("132");
  });
});

it("deletes an item from the cart when the delete button is clicked", () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );
  const shopLink = screen.getByRole("link", { name: "Shop" });
  userEvent.click(shopLink);

  const itemLink = screen.getAllByRole("link", { name: "item-link" });
  userEvent.click(itemLink[0]);

  const addToCart = screen.getByRole("link", { name: "Add to Cart" });
  userEvent.click(addToCart);

  const delBtn = screen.getAllByRole("button", { name: /delete/i })[0];
  userEvent.click(delBtn);

  expect(delBtn).not.toBeInTheDocument();
});

it("renders the amount of items in a user's cart in the navbar", () => {
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
  userEvent.click(itemLink[0]);

  const addToCart = screen.getByRole("link", { name: "Add to Cart" });
  userEvent.click(addToCart);

  expect(cartAmount.textContent).toBe("1");
});

it("renders the total price of all items in shopping cart", () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );

  const shopLink = screen.getByRole("link", { name: "Shop" });
  userEvent.click(shopLink);

  const itemLink = screen.getAllByRole("link", { name: "item-link" });
  userEvent.click(itemLink[0]);

  const price = screen.getAllByTestId("item-price")[0].textContent;
  const finalPrice = (price * 2).toString();
  const incBtn = screen.getAllByRole("button", { name: "+" })[0];
  userEvent.click(incBtn);

  const addToCart = screen.getByRole("link", { name: "Add to Cart" });
  userEvent.click(addToCart);

  const subTotal = screen.getByTestId("sub-total");
  expect(subTotal.textContent).toBe(finalPrice);
});
