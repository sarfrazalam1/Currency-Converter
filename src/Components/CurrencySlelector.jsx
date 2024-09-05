import React from "react";
import currencyCodes from "../assets/CurrencyCode.js";

const CurrencySlelector = ({ selectedCurrency, handleCurrency }) => {
  const countryCode = selectedCurrency.substring(0, 2);

  return (
    <div className="currency-select">
      <img src={`https://flagsapi.com/${countryCode}/flat/64.png`} alt="Flag" />
      <select
        onChange={handleCurrency}
        className="currency-dropdown"
        value={selectedCurrency}
      >
        {currencyCodes.map((currency) => (
          <option key={currency} value={currency}>
            {currency}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CurrencySlelector;
