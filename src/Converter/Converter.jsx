import React, { useEffect, useState } from "react";

const CurrencyConverter = () => {
  const [currencyFrom, setCurrencyFrom] = useState("USD");
  const [currencyTo, setCurrencyTo] = useState("EUR");
  const [amountFrom, setAmountFrom] = useState("");
  const [amountTo, setAmountTo] = useState("");
  const [exchangeRate, setExchangeRate] = useState(null);

  useEffect(() => {
    const fetchExchangeRate = async () => {
      try {
        const response = await fetch(
          `https://api.exchangerate-api.com/v4/latest/${currencyFrom}`
        );
        const data = await response.json();
        const rate = data.rates[currencyTo];
        setExchangeRate(rate);
      } catch (error) {
        console.error("Error", error);
      }
    };

    fetchExchangeRate();
  }, [currencyFrom, currencyTo]);

  useEffect(() => {
    setAmountTo(amountFrom * exchangeRate);
  }, [exchangeRate]);

  const handleAmountFromChange = (e) => {
    const value = e.target.value;
    setAmountFrom(value);
    if (exchangeRate && value !== "") {
      setAmountTo((parseFloat(value) * exchangeRate).toFixed(2));
    } else {
      setAmountTo("");
    }
  };

  const handleAmountToChange = (e) => {
    const value = e.target.value;
    setAmountTo(value);
    if (exchangeRate && value !== "") {
      setAmountFrom((parseFloat(value) / exchangeRate).toFixed(2));
    } else {
      setAmountFrom("");
    }
  };

  const handleCurrencyFromChange = (e) => {
    const newCurrency = e.target.value;
    setCurrencyFrom(newCurrency);
  };

  const handleCurrencyToChange = (e) => {
    const newCurrency = e.target.value;
    setCurrencyTo(newCurrency);
  };

  return (
    <div>
      <section>
        <h2>Из {currencyFrom}</h2>
        <input
          type="number"
          value={amountFrom}
          onChange={handleAmountFromChange}
          placeholder="Amount"
        />
        <select value={currencyFrom} onChange={handleCurrencyFromChange}>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="PLN">PLN</option>
          <option value="UAH">UAH</option>
        </select>
      </section>

      <section>
        <h2>В {currencyTo}</h2>
        <input
          type="number"
          value={amountTo}
          onChange={handleAmountToChange}
          placeholder="Amount"
        />
        <select value={currencyTo} onChange={handleCurrencyToChange}>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="PLN">PLN</option>
          <option value="UAH">UAH</option>
        </select>
      </section>
    </div>
  );
};

export default CurrencyConverter;
