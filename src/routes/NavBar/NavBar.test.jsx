import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import NavBar from "./NavBar";

describe("NavBar", () => {
  it("renders navbar with all buttons", () => {
    render(
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>
    );
    const homeButton = screen.getByRole("link", { name: "Home" });
    const mensButton = screen.getByRole("link", { name: "Men's Clothing" });
    const womensButton = screen.getByRole("link", {
      name: "Women's Clothing",
    });
    const jeweleryButton = screen.getByRole("link", { name: "Jewelery" });
    const electronicsButton = screen.getByRole("link", {
      name: "Electronics",
    });
    const cartButton = screen.getByRole("link", { name: "Shopping Cart" });
    expect(homeButton).toBeInTheDocument();
    expect(mensButton).toBeInTheDocument();
    expect(womensButton).toBeInTheDocument();
    expect(jeweleryButton).toBeInTheDocument();
    expect(electronicsButton).toBeInTheDocument();
    expect(cartButton).toBeInTheDocument();
  });
});
