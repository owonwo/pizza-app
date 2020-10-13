import React from "react";
import styled from "@wigxel/react-components";
import { Link } from "react-router-dom";
// import { ToggleButton, ThemeToggle } from "./Buttons";
// import { useLayout } from "../libs/LayoutStore";
import { Grid, ShoppingCart, User } from "react-feather";
import { useStore } from "../stores/CartStore";

const HeaderStyle = styled.header`
  z-index: 6;
  display: flex;
  position: sticky;
  min-height: 60px;
  ${(props) => console.log("BG Color", props.theme.bgColor)};
  background-color: ${(props) => props.theme.bgColor || "#333"};
  color: ${(props) => props.theme.textColor || "#333"};
  box-shadow: 0px 1px 25px ${(props) => props.theme.shadowColor};

  .sec-nav {
    > * {
      // border-left: solid 1px rgba(0, 0, 0, 0.16);
    }
  }
`;

export const Header = () => {
  // const { store, action } = useLayout();
  const { items: cartItems = [] } = useStore();

  return (
    <HeaderStyle className="sticky p-3" style={{ top: 0 }}>
      <div className="flex justify-between container mx-auto pl-3">
        <span className="text-lg">
          <b>Pizza</b>KING
        </span>
        <section className="sec-nav flex justify-end items-center">
          {[
            {
              Icon: Grid,
              text: "Pizzas",
              route: "/menu",
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
              text: "Account",
              route: "/login",
            },
          ].map((e, idx) => (
            <Link to={e.route}>
              <a>
                <li key={idx} className="px-2 inline-flex flex-col mx-4 items-center">
                  {<e.Icon />}
                  <span className="text-xs font-bold">{e.text}</span>
                </li>
              </a>
            </Link>
          ))}
          {/* <ThemeToggle isDarkMode={store.isDarkMode} onClick={action({ type: 'TOGGLE_DARK_MODE'})} /> */}
        </section>
      </div>
    </HeaderStyle>
  );
};
