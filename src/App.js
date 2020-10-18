import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./Login";
import { LayoutProvider } from "./libs/LayoutStore";
import { ThemeProvider } from "styled-components";
// import { ThemeProvider as WThemeProvider } from "@wigxel/react-components";
import { Light } from "./libs/Theme";
import Menu from "./views/Menu";
import Cart from "./views/Cart";
import Account from "./views/Account";
import Shipping from "./views/Shipping";
import { Provider as CartProvider } from "./stores/CartStore";
import { Provider as AuthProvider, actions, useDispatch } from "./stores/AuthStore";
import useAuth from './hooks/useAuth';
import { AUTH_USER_KEY } from './libs/constants';
import { Modal } from '@wigxel/react-components/lib/cards';

const App = () => {
  return (
    <CartProvider>
      <LayoutProvider>
      	<AuthProvider>
	        <ThemeProvider theme={Light}>
	          <Router>
	          	<Modal.Provider>
		            <Switch>
		              <Route exact path="/login" component={Login} />
		              <Route exact path="/cart" component={Cart} />
		              <Route exact path="/shipping" component={Shipping} />
		              <Route exact path="/account" component={Account} />
		              <Route path="/" component={Menu} />
		            </Switch>
		            <LoadAuthUser />
	          	</Modal.Provider>
	          </Router>
	        </ThemeProvider>
        </AuthProvider>
      </LayoutProvider>
    </CartProvider>
  );
};

const LoadAuthUser = () => {
	const { hasToken } = useAuth();
	const dispatch = useDispatch();

	React.useEffect(() => {
		// hydrates the auth user on reload
		if (hasToken()) {
			const payload = JSON.parse(localStorage.getItem(AUTH_USER_KEY));
			dispatch({
				type: actions.SET_USER,
				payload: payload?.user
			})
		}
	}, [dispatch, hasToken])

	return <React.Fragment />
}

export default App;
