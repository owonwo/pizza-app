// import React from 'react';
import useFetch from 'use-http';
import {BASE_URL} from '../libs/constants';
import { PizzaFactory } from '../libs/factories';

export const useProducts = () => {
	const fetch = useFetch(BASE_URL + '/api/products', {}, []);

	return {
		products: fetch?.data?.data.map(PizzaFactory) || []
	}
}