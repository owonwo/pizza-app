import React from 'react';
import { ChevronDown } from 'react-feather';
import useCurrency from '../hooks/useCurrency';

export default function CurrencySwitcher() {
	const { changeCurrency, currency } = useCurrency();

	return (
		<div className="flex items-center mx-4">
			<label htmlFor="change-currency" className="hidden sr-only">CURRENCY</label>
   		<select id="change-currency"
   			value={currency.symbol}
   			className="bg-transparent appearance-none border-mix bg-mix py-2 pl-4 pr-8
   				outline-none" 
   			aria-label="Change Currency"
   			onChange={changeCurrency}>
   			<option className="text-black" value="USD">$ USD</option>
   			<option className="text-black" value="EUR">&#8364; EUR</option>
   		</select>
   		<ChevronDown className="pointer-events-none -ml-8"/>
		</div>
	);
}