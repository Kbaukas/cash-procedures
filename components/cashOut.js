const { roundAndCount, findMondayOfThisWeek } = require("./extra");

// calculation for Juridical cashout transaction
const cashOutJuridical = (transaction, settings) => {
  let cash = transaction.operation.amount;
  if (
    settings &&
    cash &&
    transaction.user_type === "juridical" &&
    transaction.type === "cash_out"
  ) {
    const percents = settings.percents;
    const min = settings.min.amount;
    let commission;

    commission = roundAndCount(cash, percents);
    commission = commission < min ? min : commission;
    return commission.toFixed(2);
  } else {
    console.log("wrong input data");
    return -1;
  }
};
// function to count comminssions for "natural" user
function cashOutNatural(transaction, settings, transactionsArray) {
  const percents = settings.percents;
  const week_limit = settings.week_limit.amount;
  let commission;
  let cash = transaction.operation.amount;
  let thisWeekAmountUntilDate = 0;
  let currentDate = new Date(transaction.date);
  let findThisWeekMonday = findMondayOfThisWeek(currentDate);
  // filtering all transactions and counting sum of cash_out this week until curent transaction's date including this date as well.
  if (
    transaction &&
    settings &&
    transactionsArray &&
    transaction.type === "cash_out"
  ) {
    transactionsArray
      .filter((element) =>
        filterHelper(element, transaction, findThisWeekMonday)
      )
      .forEach((element) => {
        thisWeekAmountUntilDate += element.operation.amount;
      });
    // console.log(thisWeekAmountUntilDate);

    // checking if transaction is chargeable and if true so counting how much

    let difference = thisWeekAmountUntilDate - week_limit;
    if (difference <= 0) {
      commission = 0;
    } else if (difference > 0) {
      if (difference > cash) {
        commission = roundAndCount(cash, percents);
      } else {
        commission = roundAndCount(difference, percents);
      }
    }

    return commission.toFixed(2);
  } else return -1;
}
// helper function to filter all transactions
function filterHelper(element, transaction, findThisWeekMonday) {
  return (
    element.user_id === transaction.user_id &&
    element.type === "cash_out" &&
    element.user_type === "natural" &&
    new Date(element.date) >= findThisWeekMonday &&
    element.date <= transaction.date
  );
}

module.exports = { cashOutJuridical, cashOutNatural };
