import React from "react";
import { Link } from "react-router-dom";
import styled from "@wigxel/react-components";
import { useLocation } from 'react-router-dom'
import { Grid, ShoppingCart, User } from "react-feather";

import { ThemeToggle } from "./Buttons";
import { useLayout } from "../libs/LayoutStore";
import Logo from '../assets/images/white-logo.svg';
import DarkLogo from '../assets/images/dark-variant.svg';
import { useStore } from "../stores/CartStore";
import { useStore as useAuthStore } from "../stores/AuthStore";
import CurrencySwitcher from './CurrencySwitcher';

export const HeaderStyle = styled.header`
  z-index: 6;
  min-height: 60px;
  background-color: ${(props) => props.theme.bgColor || "#333"};
  color: ${(props) => props.theme.colors._2 || "#333"};
  box-shadow: 0px 1px 25px ${(props) => props.theme.shadowColor};

  .sec-nav {
    > * {
      // border-left: solid 1px rgba(0, 0, 0, 0.16);
    }
  }
`;

export const Nav = ({ className = '' }) => {
	const location = useLocation()
	const { isAuthenticated } = useAuthStore(); 
	const { items: cartItems = [] } = useStore();

	return (
		<nav className={`${className} sec-nav flex items-center`}>
      {[
        {
          Icon: Grid,
          text: "Pizzas",
          route: "/",
        },
        {
          Icon: () => (
            <div className="inline-block relative">
              <span
                className="rounded-full bg-orange-500 text-white text-sm w-5 h-5 flex justify-center items-center absolute top-0 right-0
                transform translate-x-2 -translate-y-2"
              >
                {cartItems.length}
              </span>
              <ShoppingCart />
            </div>
          ),
          text: "Cart",
          route: "/cart",
        },
        {
          Icon: User,
          text: isAuthenticated ? "Account" : "Login",
          route: isAuthenticated ? '/account': "/login",
        },
      ].map((e, idx) => (
        <Link to={e.route} key={e.text} title={e.text}>
          <li key={idx} className={`${e.route === location.pathname ? 'text-primary' : ''} px-2 inline-flex flex-col mx-4 items-center`}>
            {<e.Icon />}
            <span className="text-xs font-bold">{e.text}</span>
          </li>
        </Link>
      ))}
    </nav>
   );
}

export const Header = () => {
  const { store, action } = useLayout();

  return (
    <HeaderStyle className="flex relative md:sticky p-3" style={{ top: 0 }}>
      <div className="flex justify-between items-center container mx-auto pl-3">
        <span className="text-lg">
        	<img src={store.isDarkMode ? DarkLogo : Logo} alt="Logo Images" className="h-16 md:h-20"/>
        </span>
        <div className="flex-1 hidden md:block">
        	<Nav className="justify-end" />
        </div>
       	<div className="flex items-center">
       		<CurrencySwitcher />
		      {true && <ThemeToggle isDarkMode={store.isDarkMode} onClick={action({ type: 'TOGGLE_DARK_MODE'})} /> }
		      <span className="text-xs font-bold"></span>
		    </div>
      </div>
    </HeaderStyle>
  );
};
