import React from 'react';

let initial_state = {
	menuOpen: true,
	showNotif: true,
	isDarkMode: false, // window.matchMedia('(prefers-color-scheme: dark)').matches
}

const ctx = React.createContext()

const reducer = (state, action) => {
	switch (action.type) {
		case "TOGGLE": {
			return { ...state, menuOpen: !state.menuOpen }
		}
		case "TOGGLE_NOTIF": {
			return { ...state, showNotif: !state.showNotif }
		}
		case "TOGGLE_DARK_MODE": {
			return { ...state, isDarkMode: !state.isDarkMode }
		}
		default: {
			return state
		}
	}
}

if (process.browser) {
	const value = JSON.parse(localStorage.getItem("app/layout"));
	if (value) initial_state = value;
}

export const LayoutProvider = ({ children }) => {
	const [store, dispatch] = React.useReducer(reducer, initial_state);
	const action = (a) => () => dispatch(a);
	
	React.useEffect(() => {
		localStorage.setItem("app/layout", JSON.stringify(store));
	}, [store])

	return (
		<ctx.Provider value={{ action, store, dispatch }}>
			{children}
		</ctx.Provider>
	);
}

export const useLayout = () => React.useContext(ctx);