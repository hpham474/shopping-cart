import { vi, describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Jewelery from "./Jewelery";

describe("Jewelery", () => {
  it("display loading state initially", () => {
    window.fetch = vi.fn(() => {
      const items = [
        { id: 1, title: "test item 1" },
        { id: 2, title: "test item 2" },
      ];

      return Promise.resolve({ json: () => Promise.resolve(items) });
    });

    render(<Jewelery />);
    const loadingElement = screen.getByText(/Loading items.../i);
    expect(loadingElement).toBeInTheDocument();
  });

  it("display fetched data after loading", async () => {
    window.fetch = vi.fn(() => {
      const items = [
        { id: 1, title: "test item 1" },
        { id: 2, title: "test item 2" },
      ];

      return Promise.resolve({ json: () => Promise.resolve(items) });
    });

    render(<Jewelery />);
    const item1 = await screen.findAllByText(/test item 1/i);
    const item2 = await screen.findAllByText(/test item 2/i);

    expect(item1.length).toBeGreaterThan(0);
    expect(item2.length).toBeGreaterThan(0);
  });
});
