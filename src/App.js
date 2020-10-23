import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider as FetchProvider } from 'use-http';

import Login from "./Login";
import { LayoutProvider } from "./libs/LayoutStore";
import { getToken, hasToken } from "./libs/utils";
import { ThemeProvider } from "styled-components";
// import { ThemeProvider as WThemeProvider } from "@wigxel/react-components";
import { Light } from "./libs/Theme";
import Menu from "./views/Menu";
import Cart from "./views/Cart";
import Account from "./views/Account";
import Register from "./views/Register";
import Shipping from "./views/Shipping";
import useAuth from './hooks/useAuth';
import { Provider as CartProvider } from "./stores/CartStore";
import { Provider as AuthProvider } from "./stores/AuthStore";
import { Modal } from '@wigxel/react-components/lib/cards';
import HydrateUserAndCart from './components/HydrateUserAndCart';

const App = () => {
  return (
    <LayoutProvider>
    	<HttpProvider>
		    <CartProvider>
		      	<AuthProvider>
			        <ThemeProvider theme={Light}>
			          <Router>
			          	<Modal.Provider>
				            <Switch>
				              <Route exact path="/register" component={Register} />
				              <Route exact path="/login" component={Login} />
				              <Route exact path="/cart" component={Cart} />
				              <Route exact path="/shipping" component={Shipping} />
				              <Route path="/account" component={Account} />
				              <Route path="/" component={Menu} />
				            </Switch>
				            <HydrateUserAndCart />
			          	</Modal.Provider>
			          </Router>
			        </ThemeProvider>
		        </AuthProvider>
		    </CartProvider>
	    </HttpProvider>
    </LayoutProvider>
  );
};

const HttpProvider = ({ children }) => {
	const { logoutUser } = useAuth();

	const FETCH_OPTIONS = {
		interceptors: {
			request({ options, url }) {
				const isExchange = url.includes("https://api.exchangeratesapi.io");

				if (hasToken() && !isExchange)
					options.headers.Authorization = `Bearer ${getToken()}`;
				return options;
			},
			response({ response }) {
				if (response.status === 401) {
					const { pathname } = window.location;
					if (pathname === '/account') logoutUser()
				}
				return response;
			}
		}
	}

	return (
		<FetchProvider options={FETCH_OPTIONS}>
			{children}
		</FetchProvider>
	);
}
export default App;
