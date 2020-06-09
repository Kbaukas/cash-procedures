const { roundAndCount } = require("./extra");

const cashInCommition = (transaction, settings) => {
  let cash = transaction.operation.amount;
  const percents = settings.percents;
  const max = settings.max.amount;
  let commission;
  // checking if we need to make cash_in operation and if we got other parameters
  if (settings && cash && transaction.type === "cash_in") {
    commission = roundAndCount(cash, percents);
    commission = commission < max ? commission : max;
    return commission.toFixed(2);
  } else return -1;
};

module.exports = { cashInCommition };
