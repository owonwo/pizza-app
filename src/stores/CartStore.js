import { makeStore } from "./makeStore";

const reducer = (state, action) => {
  switch (action.type) {
    case actions.ADD_TO_CART:
      return { items: [...state.items, action.payload] };

    default:
      return state;
  }
};

export const { useDispatch, Provider, useStore } = makeStore(
  {
    items: [],
  },
  reducer
);

export const actions = {
  ADD_TO_CART: "ADD_TO_CART",
};
