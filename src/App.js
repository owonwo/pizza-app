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
import { Provider as AuthProvider } from "./stores/AuthStore";
import { Modal } from '@wigxel/react-components/lib/cards';
import HydrateUserAndCart from './components/HydrateUserAndCart';

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
		            <HydrateUserAndCart />
	          	</Modal.Provider>
	          </Router>
	        </ThemeProvider>
        </AuthProvider>
      </LayoutProvider>
    </CartProvider>
  );
};

export default App;
