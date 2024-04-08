import { useEffect, useState } from 'react';
import { HiArrowsRightLeft } from 'react-icons/hi2';

import CurrencyDropdown from './CurrencyDropdown';

const hostUrl = 'https://api.frankfurter.app';
const currenciesUrl = `${hostUrl}/currencies`;

const CurrencyConverter = () => {
  const [currencies, setCurrencies] = useState([]);
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('INR');
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [favourites, setFavourites] = useState(() => {
    const favs = JSON.parse(localStorage.getItem('favourites')) || [];
    return favs;
  });
  const [isLoading, setIsLoading] = useState(false);

  const fetchCurrencies = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(currenciesUrl);
      const data = await res.json();
      // Data is object type, convert to Array
      const currencies = Object.keys(data);
      setCurrencies(currencies);
    } catch (error) {
      console.error('Error fetching all currencies! ', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCurrencies();
  }, []);

  const convertCurrency = async () => {
    if (!amount) return;

    setIsLoading(true);
    const latestRatesUrl = `${hostUrl}/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`;
    try {
      const res = await fetch(latestRatesUrl);
      const data = await res.json();
      setConvertedAmount(data?.rates[toCurrency] + ' ' + toCurrency);
    } catch (error) {
      console.error('Error converting currencies! ', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFavourite = (currency) => {
    setFavourites((prev) => {
      let updatedFavs = [...prev];
      if (prev.includes(currency)) {
        updatedFavs = prev.filter((curr) => curr !== currency);
      } else {
        updatedFavs.push(currency);
      }
      localStorage.setItem('favourites', JSON.stringify(updatedFavs));
      return updatedFavs;
    });
  };

  const handleCurrencyChange = (currency, type) => {
    if (type === 'FROM') {
      setFromCurrency(currency);
    } else if (type === 'TO') {
      setToCurrency(currency);
    }
  };

  const handleSwapCurrencies = () => {
    const temp = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(temp);
  };

  return (
    <div className="max-w-lg sm:w-full mx-auto my-10 p-5 bg-white rounded-lg shadow-md">
      <h2 className="mb-5 text-3xl font-semibold text-gray-700 text-center">
        Currency Converter
      </h2>

      {/* From and To currencies dropdown */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
        {currencies.length > 0 && (
          <CurrencyDropdown
            title="From:"
            type="FROM"
            currencies={currencies}
            favourites={favourites}
            currentCurrency={fromCurrency}
            onCurrencyChange={handleCurrencyChange}
            onFavouriteCurrencyClick={handleFavourite}
          />
        )}

        {/* Swap Currency button */}
        <div className="flex justify-center items-center -mb-5 sm:mb-2">
          <button
            className="p-2 bg-gray-200 rounded-full cursor-pointer hover:bg-gray-300"
            onClick={handleSwapCurrencies}
          >
            <HiArrowsRightLeft className="text-xl text-gray-700" />
          </button>
        </div>

        {currencies.length && (
          <CurrencyDropdown
            title="To:"
            type="TO"
            currencies={currencies}
            favourites={favourites}
            currentCurrency={toCurrency}
            onCurrencyChange={handleCurrencyChange}
            onFavouriteCurrencyClick={handleFavourite}
          />
        )}
      </div>

      {/* Input to enter amount */}
      <div className="mt-4">
        <label
          htmlFor="amount"
          className="block text-sm font-medium text-gray-700"
        >
          Amount:{' '}
        </label>
        <input
          type="number"
          value={amount}
          className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 mt-1"
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>

      {/* Convert Button */}
      <div className="flex justify-end mt-6">
        <button
          className={`px-5 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
            isLoading ? 'animate-pulse' : ''
          }`}
          onClick={convertCurrency}
          disabled={isLoading}
        >
          Convert
        </button>
      </div>

      {/* Converted Amount */}
      {convertedAmount && (
        <div className="mt-4 text-lg font-bold text-right text-green-500">
          Converted Amount: {convertedAmount}
        </div>
      )}
    </div>
  );
};

export default CurrencyConverter;
