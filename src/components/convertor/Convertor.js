import React, { useState } from "react";
import "./convertor.css";

const Convertor = ({currency}) => {
  const [currencyUAH, setCurrencyUAH] = useState("UAH");
  const [currencyUSD, setCurrencyUSD] = useState("USD");
  const [value1, setValue1] = useState("");
  const [value2, setValue2] = useState("");

  const exchangeRates = {
    UAH: currency.rates.UAH,
    USD: currency.rates.USD,
    EUR: currency.rates.EUR
  };

  const handleCurrency1Change = (event) => {
    const newCurrency = event.target.value;
    setCurrencyUAH(newCurrency);
    convertCurrency(value1, newCurrency, currencyUSD);
  };

  const handleCurrency2Change = (event) => {
    const newCurrency = event.target.value;
    setCurrencyUSD(newCurrency);
    convertCurrency(value1, currencyUAH, newCurrency);
  };

  const handleValue1Change = (event) => {
    const newValue1 = parseFloat(event.target.value);
    setValue1(newValue1);
    convertCurrency(newValue1, currencyUAH, currencyUSD);
  };

  const handleValue2Change = (event) => {
    const newValue2 = parseFloat(event.target.value);
    setValue2(newValue2);
    convertCurrency(newValue2, currencyUSD, currencyUAH);
  };

  const convertCurrency = (value, fromCurrency, toCurrency) => {
    if (isNaN(value)) {
      setValue1("");
      setValue2("");
      return;
    }

    const convertedValue = (value / exchangeRates[fromCurrency]) * exchangeRates[toCurrency];
    if (isNaN(convertedValue)) {
      setValue1("");
      setValue2("");
      return;
    }

    setValue1(value);
    setValue2(convertedValue);
  };

  return (
    <div className="main_convertor">
      <div className="convertor_content">
        <input type="number" value={value1} onChange={handleValue1Change} />
        <select value={currencyUAH} onChange={handleCurrency1Change}>
          <option value="UAH">UAH</option>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
        </select>
      </div>
      <div className="convertor_content">
        <input type="number" value={value2} onChange={handleValue2Change} />
        <select value={currencyUSD} onChange={handleCurrency2Change}>
          <option value="UAH">UAH</option>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
        </select>
      </div>
    </div>
  );
};

export default Convertor;