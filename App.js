const url = "http://private-38e18c-uzduotis.apiary-mock.com/config/";
const cashInSetting = url + "cash-in";
const cashOutNaturalSettings = url + "cash-out/natural";
const cashOutJuridicalSettings = url + "cash-out/juridical";
const jasonFile = "./input.json";

const { readLocalJason, getConfigData } = require("./components/extra");
const { cashOutJuridical, cashOutNatural } = require("./components/cashOut");
let transactionsData = readLocalJason(jasonFile);
const { cashInCommition } = require("./components/cashIn");
getConfigData(
  cashInSetting,
  cashOutJuridicalSettings,
  cashOutNaturalSettings
).then((config) => {
  transactionsData.map((c) => {
    if (c.type === "cash_out") {
      if (c.user_type === "natural") {
        try {
          console.log(
            cashOutNatural(c, config.cashOutNaturalSettings, transactionsData)
          );
        } catch (e) {
          console.log(e);
        }
      } else console.log(cashOutJuridical(c, config.cashOutJuridicalSettings));
    } else console.log(cashInCommition(c, config.cashInSettings));
  });
});
