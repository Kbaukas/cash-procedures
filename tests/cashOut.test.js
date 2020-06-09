const { cashOutJuridical, cashOutNatural } = require("../components/cashOut");

describe("cashOutJuridical", () => {
  const settings = { percents: 0.3, min: { amount: 0.5, currency: "EUR" } };
  const cashOutJuridicalData = [
    {
      date: "2020-05-06",
      user_id: 1,
      user_type: "juridical",
      type: "cash_out",
      operation: { amount: 0.01 },
      expected: "0.50",
    },
    {
      date: "2020-05-07",
      user_id: 1,
      user_type: "natural",
      type: "cash_out",
      operation: { amount: 9000 },
      expected: -1,
    },
    {
      date: "2020-05-07",
      user_id: 1,
      user_type: "juridical",
      type: "cash_out",
      operation: { amount: 16000 },
      expected: "48.00",
    },
    {
      date: "2020-05-10",
      user_id: 1,
      user_type: "juridical",
      type: "cash_out",
      operation: { amount: 211.11 },
      expected: "0.64",
    },
    {
      date: "2020-05-10",
      user_id: 3,
      user_type: "juridical",
      type: "cash_out",
      operation: { amount: 99999999999 },
      expected: "300000000.00",
    },
  ];

  cashOutJuridicalData.forEach((item) => {
    test(`${item.operation.amount} ==> ${item.expected}`, () => {
      expect(cashOutJuridical(item, settings)).toBe(item.expected);
    });
  });
});

describe("cashOutNatural", () => {
  const cashOutNaturalData = [
    {
      date: "2020-05-06",
      user_id: 1,
      user_type: "natural",
      type: "cash_out",
      operation: { amount: 1000 },

      expected: "0.00",
    },
    {
      date: "2020-05-07",
      user_id: 1,
      user_type: "natural",
      type: "cash_out",
      operation: { amount: 1 },
      expected: "0.01",
    },
    {
      date: "2020-05-07",
      user_id: 1,
      user_type: "natural",
      type: "cash_in",
      operation: { amount: 100 },
      expected: -1,
    },
    {
      date: "2020-05-10",
      user_id: 1,
      user_type: "natural",
      type: "cash_out",
      operation: { amount: 100 },
      expected: "0.30",
    },
    {
      date: "2020-05-10",
      user_id: 3,
      user_type: "natural",
      type: "cash_out",
      operation: { amount: 100 },
      expected: "0.00",
    },
    {
      date: "2020-05-12",
      user_id: 3,
      user_type: "natural",
      type: "cash_out",
      operation: { amount: 1100 },
      expected: "0.30",
    },
    {
      date: "2020-05-13",
      user_id: 3,
      user_type: "natural",
      type: "cash_out",
      operation: { amount: 1000 },
      expected: "3.00",
    },
    {
      date: "2020-05-15",
      user_id: 1,
      user_type: "natural",
      type: "cash_out",
      operation: { amount: 300 },
      expected: "0.00",
    },
  ];

  const settings = { percents: 0.3, week_limit: { amount: 1000 } };

  cashOutNaturalData.forEach((item) => {
    test(`${item.operation.amount}==>${item.expected}`, () => {
      expect(cashOutNatural(item, settings, cashOutNaturalData)).toBe(
        item.expected
      );
    });
  });
});
