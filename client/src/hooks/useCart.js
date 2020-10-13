import React from 'react';
import * as R from 'ramda';
import { PizzaFactory } from '../libs/factories';
import { useDispatch, actions } from "../stores/CartStore";

const useCart = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
  	const item = localStorage.getItem("CART_STORE");
    if (item) {
      dispatch({
        type: actions.HYDRATE,
        payload: R.over(R.lensProp('items'), R.map(PizzaFactory), JSON.parse(item)),
      });
    }
  }, [])

  return {}
};

export default useCart;
