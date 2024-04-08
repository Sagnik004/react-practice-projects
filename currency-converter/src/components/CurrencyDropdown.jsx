import { HiOutlineStar, HiStar } from 'react-icons/hi2';
import PropTypes from 'prop-types';

const CurrencyDropdown = (props) => {
  const {
    title = '',
    type,
    currencies,
    currentCurrency,
    favourites,
    onCurrencyChange,
    onFavouriteCurrencyClick,
  } = props;

  const currencyWithoutFavs = currencies.filter((currency) => {
    if (favourites.indexOf(currency) === -1) {
      return true;
    } else {
      return false;
    }
  });

  const isCurrentCurrencyFav = favourites.includes(currentCurrency);

  return (
    <div className="py-2">
      <label
        htmlFor={title}
        className="block text-sm font-medium text-gray-700"
      >
        {title}
      </label>

      <div className="mt-1 relative">
        <select
          name="currencyDropdown"
          value={currentCurrency}
          onChange={(e) => onCurrencyChange(e.target.value, type)}
          className="w-full p-2 border bg-gray-200 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          {favourites.map((currency) => (
            <option key={currency} value={currency} className="bg-gray-200">
              {currency}
            </option>
          ))}
          <hr />
          {currencyWithoutFavs.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>

        <button
          className="absolute inset-y-0 right-0 pr-5 flex items-center text-sm leading-5"
          onClick={() => onFavouriteCurrencyClick(currentCurrency)}
        >
          {isCurrentCurrencyFav ? <HiStar /> : <HiOutlineStar />}
        </button>
      </div>
    </div>
  );
};

CurrencyDropdown.propTypes = {
  title: PropTypes.string,
  type: PropTypes.string,
  currencies: PropTypes.array,
  currentCurrency: PropTypes.string,
  favourites: PropTypes.array,
  onCurrencyChange: PropTypes.func,
  onFavouriteCurrencyClick: PropTypes.func,
};

export default CurrencyDropdown;
