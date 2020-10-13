import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Layout from "./views/Layout";
import Login from "./Login";
import { LayoutProvider } from "./libs/LayoutStore";
import { ThemeProvider } from "styled-components";
import { ThemeProvider as WThemeProvider } from "@wigxel/react-components";
import { Light } from "./libs/Theme";
import Menu from "./views/Menu";
import Cart from "./views/Cart";
import { Provider as CartProvider } from "./stores/CartStore";

const App = () => {
  return (
    <CartProvider>
      <LayoutProvider>
        <ThemeProvider theme={Light}>
          <Router>
            <Switch>
              <Route exact path="/login" component={Login} />
              <Route exact path="/Cart" component={Cart} />
              <Route path="/" component={Menu} />
            </Switch>
          </Router>
        </ThemeProvider>
      </LayoutProvider>
    </CartProvider>
  );
};

export default App;
