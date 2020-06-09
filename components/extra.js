const axios = require("axios");
// function to read from local Json
function readLocalJason(jasonFile) {
  try {
    let json = require(jasonFile);
    return json;
  } catch (error) {
    console.error("no local Json file found!!!");
  }
}
// helper function to get settings from url
async function getConfigData(
  cashInURL,
  cashOutJuridicalURL,
  cashOutNaturalURL
) {
  let cashInSettings;
  let cashOutJuridicalSettings;
  let cashOutNaturalSettings;
  await axios
    .all([
      axios.get(cashInURL),
      axios.get(cashOutJuridicalURL),
      axios.get(cashOutNaturalURL),
    ])
    .then((responseArr) => {
      // if got response
      cashInSettings = responseArr[0].data;
      cashOutJuridicalSettings = responseArr[1].data;
      cashOutNaturalSettings = responseArr[2].data;
    })
    .catch((error) => {
      // if got error print out error
      console.log(error);
    });
  // returning object of settings
  return { cashInSettings, cashOutJuridicalSettings, cashOutNaturalSettings };
}
// helper function to count percentage and round to bigger side
function roundAndCount(cash, percents) {
  let commission = (cash * percents) / 100;
  commission = Math.ceil(commission * 100) / 100;
  return commission;
}

// function to find Monday of current week(from transaction's date  )

function findMondayOfThisWeek(date) {
  // finding Monday of current week
  date = new Date(date);
  const weekDay = date.getDay();
  const getDay = date.getDate();
  let previousMonday = new Date(
    date.setDate(getDay - weekDay + (weekDay === 0 ? -6 : 1))
  );

  return previousMonday;
}

module.exports = {
  findMondayOfThisWeek,
  readLocalJason,
  getConfigData,
  roundAndCount,
};
