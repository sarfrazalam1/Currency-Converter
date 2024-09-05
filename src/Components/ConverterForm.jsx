import React, { useEffect, useState } from "react";
import { FaExchangeAlt } from "react-icons/fa";
import CurrencySlelector from "./CurrencySlelector";

const ConverterForm = () => {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("INR");
  const [result, setResult] = useState("");
  const [isLoading, seIsLoading] = useState(false);

  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const getExchangeRate = async () => {
    const API_KEY = import.meta.env.VITE_API_KEY;
    const API_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/pair/${fromCurrency}/${toCurrency}`;

    seIsLoading(true);

    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw Error("something went wrong!");
      const data = await response.json();
      const rate = (data.conversion_rate * amount).toFixed(2);
      setResult(`${amount}  ${fromCurrency} = ${rate} ${toCurrency}`);
    } catch (error) {
      console.log(error);
    } finally {
      seIsLoading(false);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    getExchangeRate();
  };

  useEffect(() => getExchangeRate, []);

  return (
    <form className="converter-form" onSubmit={handleFormSubmit}>
      <div className="form-input">
        <label>Enter Amount</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
      </div>

      <div className="swap-container">
        <div className="from-container">
          <label>From</label>
          <CurrencySlelector
            selectedCurrency={fromCurrency}
            handleCurrency={(e) => setFromCurrency(e.target.value)}
          />
        </div>
        <div className="swap-icon" onClick={handleSwap}>
          <FaExchangeAlt />
        </div>
        <div className="to-container">
          <label>To</label>
          <CurrencySlelector
            selectedCurrency={toCurrency}
            handleCurrency={(e) => setToCurrency(e.target.value)}
          />
        </div>
      </div>
      <button type="submit" className={`${isLoading ? "loading" : ""}`}>
        Get Exchange Rate
      </button>
      <div className="result-container">
        <p>{isLoading ? "Getting Exchange Rate..." : result}</p>
      </div>
    </form>
  );
};

export default ConverterForm;
