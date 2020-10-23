import useFetch from 'use-http';
import { BASE_URL } from '../libs/constants';
import { OrderFactory } from '../libs/factories';

const useOrders = () => {
	const fetch = useFetch(BASE_URL + '/api/orders', {}, []);

	return {
		...fetch,
		data: fetch?.data?.data.map(OrderFactory) || []
	}
}

export default useOrders;