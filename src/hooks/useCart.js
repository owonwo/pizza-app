import * as R from 'ramda'
import useFetch from 'use-http';
import { trace } from '@wigxel/utils';
import { Either } from 'ramda-fantasy';
import { BASE_URL } from '../libs/constants';
import { useDispatch, useStore } from "../stores/CartStore";

const IdQuantityPair = R.compose(
	trace('Values'),
	R.values,
	R.pick(['id', 'quantity'])
)

const useCart = () => {
  const { items } = useStore();
  const dispatch = useDispatch();
 	const base = useFetch(BASE_URL + '/api/place-order', { });

 	const deliveryFee = 25;


	// placeOrder :: FormData -> Promise(e a -> Either)
	const placeOrder = async (formData) => {
		base.cache.clear();
		const payload = await base.post(trace('FormData')({ 
			...formData,
			product_ids: R.map(IdQuantityPair, items)
		}));

		if (!base.response.ok) {
			return Either.Left(payload);
		}

		return Either.Right(payload);
	}


  return {
  	items,
  	deliveryFee,
  	clearCart: dispatch.curry('CLEAR_CART'),
  	inCart: (item_id) => items.findIndex((a) => a.getId() === item_id) !== -1,
  	getTotal: () => items.reduce((alloc, e) => alloc + e.price * (e.quantity || 1), 0),
  	placeOrder
  }
};

export default useCart;
