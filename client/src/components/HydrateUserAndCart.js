
import React from 'react';
import * as R from 'ramda';
import useAuth from '../hooks/useAuth';
import { PizzaFactory } from '../libs/factories';
import { AUTH_USER_KEY } from '../libs/constants';
import { actions, useDispatch } from "../stores/AuthStore";
import { actions as cartActions, useDispatch as useCartDispatch } from "../stores/CartStore";

const HydrateUserAndCart = () => {
	const { hasToken } = useAuth();
	const dispatchers = {
		auth: useDispatch(),
	};
	const cartDispatch = useCartDispatch()

  React.useEffect(() => {
  	// hydrates the cart items (from LocalStorage) on reload
  	const item = localStorage.getItem("CART_STORE");
    if (item) {
      cartDispatch({
        type: cartActions.HYDRATE,
        payload: R.over(R.lensProp('items'), R.map(PizzaFactory), JSON.parse(item)),
      });
    }
  }, [cartDispatch])
	  
	React.useEffect(() => {
		// hydrates the auth user on reload
		if (hasToken()) {
			const payload = JSON.parse(localStorage.getItem(AUTH_USER_KEY));
			dispatchers.auth({
				type: actions.SET_USER,
				payload: payload?.user
			})
		}
	}, [dispatchers, dispatchers.auth, hasToken])

	return <React.Fragment />
}


export default HydrateUserAndCart