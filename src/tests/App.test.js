import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";

describe("User can navigate the site by clicking links in the navbar", () => {
  test("Clicking the shop link takes user to shop page.", () => {
    render(<App />);
    const shopLink = screen.getByRole("link", { name: "Shop" });
    const homeHeader = screen.getByRole("heading", {
      name: "Our very own online shop",
    });
    const shopHeader = screen.getByTole("heading", { name: "Spend money" });
    expect(homeHeader).toBeInTheDocument();
    userEvent.click(shopLink);

    expect(shopHeader).toBeInTheDocument();
    expect(homeHeader).not.toBeInTheDocument();
  });
});
