import * as R from 'ramda';
// import { trace } from '@wigxel/utils';
import useFetch from 'use-http';
import { Either } from 'ramda-fantasy';
import { useDispatch, useStore, actions } from '../stores/CartStore';

const CURRENCIES = Object.freeze({
	'USD': '$',
	'EUR': '€',
});

const getSymbolEntity = R.ifElse(
	R.isNil, 
	R.always('$'), 
	R.prop(R.__, CURRENCIES)
);

const useCurrency = () => {
	const dispatch = useDispatch();
	const { currency = { symbol: 'USD', rate: 1 } } = useStore();

	const fetch = useFetch('https://api.exchangeratesapi.io/latest?base=USD&symbols=EUR,GBP', {});

		// getExRate :: String -> Promise(a -> Either)
	const getExRate = async (symbol) => {
		const payload = await fetch.get();
		const getRateByName = R.path(['rates', symbol]);
		
		if (!fetch.response.ok) 
			return Either.Left('Error getting exchange');

		const rate = getRateByName(payload)
		if (!rate) Either.Left('Error: No Exchange Rate for ' + symbol);

		return Either.Right({ symbol, rate });
	} 

	const changeCurrency = R.compose(
			R.andThen(
				Either.either(
					(payload) => console.error(payload),
	 				dispatch.curry(actions.CURRENCY_AND_RATE)
				)
			),
		 	getExRate,
			R.path(['target', 'value'])
		)

  const formatPrice = R.memoizeWith(R.identity, (price) => {
  	const newPrice = price * (currency.rate || 1);

  	return `${getSymbolEntity(currency.symbol)} ${newPrice.toFixed(2)}`;
  })

	return {
		currency,
		changeCurrency, 
		formatPrice
	}
}

export default useCurrency;