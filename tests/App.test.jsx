import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import App from "../src/App.jsx";
import Home from "../src/routes/Home/Home";
import Cart from "../src/routes/Cart/Cart";
import Electronics from "../src/routes/Electronics/Electronics";
import Jewelery from "../src/routes/Jewelery/Jewelery";
import MensClothing from "../src/routes/MensClothing/MensClothing";
import WomensClothing from "../src/routes/WomensClothing/WomensClothing";

vi.mock("react-router-dom", async () => {
  const actualRouterDom = await vi.importActual("react-router-dom");

  return {
    ...actualRouterDom,
    useOutletContext: () => ({
      cart: [
        { item: { id: 1, name: "Item A" }, quantity: 2 },
        { item: { id: 2, name: "Item B" }, quantity: 1 },
      ],
      cartChange: vi.fn(),
      cartRemove: vi.fn(),
    }),
  };
});

describe("App", () => {
  beforeEach(() => {
    window.fetch = vi.fn(() => {
      const items = [
        {
          id: 1,
          title: "test item 1",
          price: 109.95,
          description: "item description 1",
        },
        {
          id: 2,
          title: "test item 2",
          price: 22.3,
          description: "item description 1",
        },
      ];

      return Promise.resolve({ json: () => Promise.resolve(items) });
    });
  });

  it("page loads at home page", async () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="electronics" element={<Electronics />} />
          <Route path="jewelery" element={<Jewelery />} />
          <Route path="mens" element={<MensClothing />} />
          <Route path="womens" element={<WomensClothing />} />
        </Routes>
      </MemoryRouter>
    );

    const websiteTitle = await screen.findByRole("heading", {
      name: /Shopping Site/i,
      level: 2,
    });
    expect(websiteTitle).toBeInTheDocument();
  });

  it("clicking on a button will switch pages", async () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="cart" element={<Cart />} />
          <Route path="electronics" element={<Electronics />} />
          <Route path="jewelery" element={<Jewelery />} />
          <Route path="mens" element={<MensClothing />} />
          <Route path="womens" element={<WomensClothing />} />
        </Routes>
      </MemoryRouter>
    );

    const mensClothingLink = screen.getByRole("link", {
      name: "Men's Clothing",
    });
    const cartLink = screen.getByRole("link", { name: /Shopping Cart/i });
    await userEvent.click(cartLink);
    await userEvent.click(mensClothingLink);

    const mensClothingTitle = screen.getByRole("heading", {
      name: /Men's Clothing/i,
    });
    const cartTitle = screen.getByRole("heading", {
      name: /Men's Clothing/i,
    });

    expect(mensClothingTitle).toBeInTheDocument();
    expect(cartTitle).toBeInTheDocument();
  });
});
