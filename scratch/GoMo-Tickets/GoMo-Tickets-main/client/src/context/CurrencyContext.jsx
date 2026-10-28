import React, { createContext, useState, useContext } from 'react';

const CurrencyContext = createContext();

const EXCHANGE_RATES = {
  USD: { symbol: '$', rate: 1 },
  INR: { symbol: '₹', rate: 83.5 },
  EUR: { symbol: '€', rate: 0.92 },
  GBP: { symbol: '£', rate: 0.79 },
  AUD: { symbol: 'A$', rate: 1.51 }
};

export const CurrencyProvider = ({ children }) => {
  const [currency, setCurrency] = useState('INR');

  const getLocalPrices = () => {
    switch (currency) {
      case 'INR': return { feePercent: 0.1, gstPercent: 0.18 };
      case 'EUR': return { feePercent: 0.1, gstPercent: 0.20 };
      case 'GBP': return { feePercent: 0.1, gstPercent: 0.20 };
      case 'AUD': return { feePercent: 0.1, gstPercent: 0.10 };
      default: return { feePercent: 0.1, gstPercent: 0.15 }; // USD
    }
  };

  const formatLocalPrice = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: currency === 'INR' ? 0 : 2,
      maximumFractionDigits: 2
    }).format(amount);
  };

  const formatPrice = (usdAmount) => {
    const selected = EXCHANGE_RATES[currency] || EXCHANGE_RATES.USD;
    const converted = usdAmount * selected.rate;
    return formatLocalPrice(converted);
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, formatPrice, formatLocalPrice, getLocalPrices, EXCHANGE_RATES }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => useContext(CurrencyContext);
