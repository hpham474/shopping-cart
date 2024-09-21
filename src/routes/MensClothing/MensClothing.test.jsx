import { vi, describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import MensClothing from "./MensClothing";

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
    }),
  };
});

describe("MensClothing", () => {
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

  it("display loading state initially", () => {
    render(<MensClothing />);
    const loadingElement = screen.getByText(/Loading items.../i);
    expect(loadingElement).toBeInTheDocument();
  });

  it("display fetched data after loading", async () => {
    render(<MensClothing />);
    const item1 = await screen.findAllByText(/test item 1/i);
    const item2 = await screen.findAllByText(/test item 2/i);

    expect(item1.length).toBeGreaterThan(0);
    expect(item2.length).toBeGreaterThan(0);
  });
});
