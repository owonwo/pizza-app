import * as R from'ramda'
import { makeStore } from "./makeStore";

const addToLS = (a) => {
  localStorage.setItem("CART_STORE", JSON.stringify(a));
  return a;
};

const Lenses = {
	Items: R.lensProp('items')
}

const reducer = (state, action) => {
  switch (action.type) {
    case actions.ADD_TO_CART:
      return addToLS({ ...state, items: [...state.items, action.payload] });

    case actions.HYDRATE:
    	if (!state.hydrated) {
    		return { ...action.payload, hydrated: true };
    	}
    	return state;

    case actions.CLEAR_CART:
    	return addToLS(R.set(Lenses.Items, [], state));

    case actions.REMOVE_ITEM:
    	return addToLS(R.over(Lenses.Items, R.filter((e) => e.getId() !== action.payload), state))

    case actions.SET_ITEM_QUANTITY:
	    const { itemIndex, quantity } = action;
	    const indexLens = R.lensPath(['items', itemIndex]);

	    return R.over(indexLens, R.set(R.lensProp('quantity'), quantity), state);

    default:
      return state;
  }
};

export const { useDispatch, Provider, useStore } = makeStore(
  {
  	hydrated: false,
    items: [],
  },
  reducer
);

export const actions = {
  ADD_TO_CART: "ADD_TO_CART",
  HYDRATE: "HYDRATE",
  CLEAR_CART: "CLEAR_CART",
  REMOVE_ITEM: "REMOVE_ITEM",
  SET_ITEM_QUANTITY: "SET_ITEM_QUANTITY",
};
