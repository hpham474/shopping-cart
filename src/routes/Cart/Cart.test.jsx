import { vi, describe, it, expect } from "vitest";
import { useOutletContext } from "react-router-dom";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Cart from "./Cart";

vi.mock("react-router-dom", () => ({
  ...vi.importActual("react-router-dom"),
  useOutletContext: vi.fn(),
}));

describe("Cart", () => {
  it("display empty message when cart has no items", () => {
    vi.mocked(useOutletContext).mockReturnValue({
      cart: [],
      cartChange: vi.fn(),
      cartRemove: vi.fn(),
    });

    render(<Cart />);
    const emptyElement = screen.getByText(/No Items In Shopping Cart/i);
    expect(emptyElement).toBeInTheDocument();
  });

  it("display cart items when cart has items", () => {
    vi.mocked(useOutletContext).mockReturnValue({
      cart: [
        { item: { id: 1, title: "Item A", price: "64" }, quantity: 2 },
        { item: { id: 2, title: "Item B", price: "23.5" }, quantity: 1 },
      ],
      cartChange: vi.fn(),
      cartRemove: vi.fn(),
    });

    render(<Cart />);
    const item1 = screen.getByText(/Item A/i);
    const item2 = screen.getByText(/Item B/i);

    expect(item1).toBeInTheDocument();
    expect(item2).toBeInTheDocument();

    const item1Quantity = screen.getByDisplayValue("2");
    const item2Quantity = screen.getByDisplayValue("1");

    expect(item1Quantity).toBeInTheDocument();
    expect(item2Quantity).toBeInTheDocument();
  });

  it("quantity changes with increment button", async () => {
    vi.mocked(useOutletContext).mockReturnValue({
      cart: [
        { item: { id: 1, title: "Item A", price: "64" }, quantity: 4 },
        { item: { id: 2, title: "Item B", price: "64" }, quantity: 2 },
      ],
      cartChange: vi.fn(),
      cartRemove: vi.fn(),
    });

    render(<Cart />);
    const incrementButtons = screen.getAllByRole("button", { name: /\+/i });
    await userEvent.click(incrementButtons[0]);
    await userEvent.click(incrementButtons[1]);

    const item1Quantity = screen.getByDisplayValue("5");
    const item2Quantity = screen.getByDisplayValue("3");

    expect(item1Quantity).toBeInTheDocument();
    expect(item2Quantity).toBeInTheDocument();
  });

  it("quantity changes with decrement button, if quantity is at 1 quantity does not change", async () => {
    vi.mocked(useOutletContext).mockReturnValue({
      cart: [
        { item: { id: 1, title: "Item A", price: "64" }, quantity: 11 },
        { item: { id: 2, title: "Item B", price: "23.5" }, quantity: 5 },
        { item: { id: 3, title: "Item C", price: "19.49" }, quantity: 1 },
      ],
      cartChange: vi.fn(),
      cartRemove: vi.fn(),
    });

    render(<Cart />);
    const incrementButtons = screen.getAllByRole("button", { name: /-/i });
    await userEvent.click(incrementButtons[0]);
    await userEvent.click(incrementButtons[1]);
    await userEvent.click(incrementButtons[2]);

    const item1Quantity = screen.getByDisplayValue("10");
    const item2Quantity = screen.getByDisplayValue("4");
    const item3Quantity = screen.getByDisplayValue("1");

    expect(item1Quantity).toBeInTheDocument();
    expect(item2Quantity).toBeInTheDocument();
    expect(item3Quantity).toBeInTheDocument();
  });

  it("remove items when trash button is clicked", async () => {
    const cart = [
      { item: { id: 1, title: "Item A", price: "64" }, quantity: 2 },
      { item: { id: 2, title: "Item B", price: "23.5" }, quantity: 1 },
    ];

    const cartRemove = vi.fn((item) => {
      const index = cart.findIndex((cartItem) => cartItem.item.id === item.id);
      if (index !== -1) {
        cart.splice(index, 1); // Remove the item from the cart
      }
    });

    vi.mocked(useOutletContext).mockReturnValue({
      cart,
      cartChange: vi.fn(),
      cartRemove: cartRemove,
    });

    render(<Cart />);

    const item1 = screen.queryByText(/Item A/i);
    const item2 = screen.queryByText(/Item B/i);

    expect(item1).toBeInTheDocument();
    expect(item2).toBeInTheDocument();

    const removeButtons = screen.getAllByRole("button", { name: /remove/i });
    await userEvent.click(removeButtons[0]);

    waitFor(() => {
      expect(item1).not.toBeInTheDocument();
      expect(item2).toBeInTheDocument();
    });
  });
});
