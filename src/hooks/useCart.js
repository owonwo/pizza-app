import React from 'react';
import * as R from 'ramda';
import { PizzaFactory } from '../libs/factories';
import { useDispatch, useStore, actions } from "../stores/CartStore";

const useCart = () => {
  const { items } = useStore();
  const dispatch = useDispatch();

  React.useEffect(() => {
  	const item = localStorage.getItem("CART_STORE");
    if (item) {
      dispatch({
        type: actions.HYDRATE,
        payload: R.over(R.lensProp('items'), R.map(PizzaFactory), JSON.parse(item)),
      });
    }
  }, [dispatch])
 	
 	const deliveryFee = 25;

  return {
  	items,
  	deliveryFee,
  	clearCart: dispatch.curry('CLEAR_CART'),
  	getTotal: () => items.reduce((alloc, e) => alloc + e.price * (e.quantity || 1), 0)
  }
};

export default useCart;
