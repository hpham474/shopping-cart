import { vi, describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Home from "./Home";

describe("Home", () => {
  it("display loading state initially", () => {
    window.fetch = vi.fn(() => {
      const items = [
        { id: 1, title: "test item 1", price: 109.95 },
        { id: 2, title: "test item 2", price: 22.3 },
      ];

      return Promise.resolve({ json: () => Promise.resolve(items) });
    });

    render(<Home />);
    const loadingElement = screen.getByText(/Loading items.../i);
    expect(loadingElement).toBeInTheDocument();
  });

  it("display fetched data after loading", async () => {
    window.fetch = vi.fn(() => {
      const items = [
        { id: 1, title: "test item 1", price: 109.95 },
        { id: 2, title: "test item 2", price: 22.3 },
      ];

      return Promise.resolve({ json: () => Promise.resolve(items) });
    });

    render(<Home />);
    const item1Title = await screen.findAllByText(/test item 1/i);
    const item2Title = await screen.findAllByText(/test item 2/i);
    const item1Price = await screen.findAllByText(/\$109.95/i);
    const item2Price = await screen.findAllByText(/\$22.30/i);

    expect(item1Title.length).toBeGreaterThan(0);
    expect(item2Title.length).toBeGreaterThan(0);
    expect(item1Price.length).toBeGreaterThan(0);
    expect(item2Price.length).toBeGreaterThan(0);
  });
});
