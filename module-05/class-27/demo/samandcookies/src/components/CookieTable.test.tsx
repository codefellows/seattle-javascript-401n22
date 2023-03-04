import { render, screen } from "@testing-library/react";
import { CookieStand, CookieTable } from "./CookieTable";

const mockSeattle: CookieStand = {
  locationName: "Seattle",
  minCustomersPerHour: 3,
  maxCustomersPerHour: 3,
  avgCookiesPerSale: 3,
  customersEachHour: [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
  cookiesEachHour: [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
  totalCookies: 126,
};

const mockPortland: CookieStand = {
  locationName: "Portland",
  minCustomersPerHour: 5,
  maxCustomersPerHour: 5,
  avgCookiesPerSale: 5,
  customersEachHour: [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
  cookiesEachHour: [25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25],
  totalCookies: 350,
};

describe("Cookie Table", () => {
  it("renders a row of hours", () => {
    render(<CookieTable stores={[]} />);

    expect(screen.getByText(/7am/i)).toBeDefined();
  });

  it("renders a store", () => {
    render(<CookieTable stores={[new CookieStand("Seattle", 2, 10, 5)]} />);

    expect(screen.getByText(/seattle/i)).toBeDefined();
  });

  it("renders cookie sales", () => {
    render(<CookieTable stores={[mockSeattle]} />);

    expect(screen.getAllByText(/126/i).length).toBe(2); // Daily and total of totals
  });

  it("renders all cookie sales", () => {
    render(<CookieTable stores={[mockSeattle, mockPortland]} />);

    expect(screen.getByTestId("total-of-totals").textContent).toBe("476");
  });
});
