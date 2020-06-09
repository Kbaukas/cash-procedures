const { cashInCommition } = require("../components/cashIn");

describe("testing cashInCommition", () => {
  const settings = { percents: 0.03, max: { amount: 5, currency: "EUR" } };
  const cashInTests = [
    { type: "cash_in", operation: { amount: 50 }, expected: "0.02" },
    { type: "cash_in", operation: { amount: 7000 }, expected: "2.10" },
    { type: "cash_in", operation: { amount: 999999999999 }, expected: "5.00" },
    { type: "cash_in", operation: { amount: 20.22 }, expected: "0.01" },
    { type: "cash_in", operation: { amount: null }, expected: -1 },
    { type: "cash_in", operation: { amount: "" }, expected: -1 },
  ];

  cashInTests.forEach((item) => {
    test(`"cash"${item.amount} ==> ${item.expected}`, () => {
      expect(cashInCommition(item, settings)).toBe(item.expected);
    });
  });
});
