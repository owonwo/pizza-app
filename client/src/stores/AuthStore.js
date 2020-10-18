import { makeStore } from "./makeStore";
import { AUTH_USER_KEY } from '../libs/constants';

const addToLS = (a) => {
  localStorage.setItem(AUTH_USER_KEY, JSON.stringify(a));
  return a;
};

const reducer = (state, action) => {
  switch (action.type) {
    case actions.HYDRATE:
    	if (!state.hydrated) {
    		return { ...action.payload, hydrated: true };
    	}
    	return state;

    case actions.SET_USER:
    	return addToLS({
    		isAuthenticated: true,
    		user: action.payload,
    		hydrated: true
	    });

    case actions.REMOVE_USER:
	    return addToLS({
	    	isAuthenticated: false,
	    	user: null,
	    	hydrated: true
	    });

    default:
      return state;
  }
};

export const { useDispatch, Provider, useStore } = makeStore(
  {
  	hydrated: false,
    user: null,
    isAuthenticated: false,
  },
  reducer
);

export const actions = {
  SET_USER: "SET_USER",
  REMOVE_USER: 'REMOVE_USER',
  HYDRATE: "HYDRATE",
};
