import { describe, it, expect, vi } from "vitest";
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

describe("App", () => {
  it("page loads at home page", async () => {
    window.fetch = vi.fn(() => {
      const items = [
        { id: 1, title: "test item 1", price: 109.95 },
        { id: 2, title: "test item 2", price: 22.3 },
      ];

      return Promise.resolve({ json: () => Promise.resolve(items) });
    });

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

    const websiteTitle = await screen.findByRole("heading", {
      name: /Shopping Site/i,
      level: 2,
    });
    expect(websiteTitle).toBeInTheDocument();
  });

  it("clicking on a button will switch pages", async () => {
    window.fetch = vi.fn(() => {
      const items = [
        { id: 1, title: "test item 1", price: 109.95 },
        { id: 2, title: "test item 2", price: 22.3 },
      ];

      return Promise.resolve({ json: () => Promise.resolve(items) });
    });

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
