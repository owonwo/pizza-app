import React from "react";
import styled from "@wigxel/react-components";
// import { ToggleButton, ThemeToggle } from "./Buttons";
// import { useLayout } from "../libs/LayoutStore";
import Logo from "../assets/images/logo.png";
import { Menu, ShoppingCart, User } from "react-feather";
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
  const { items: cartItems } = useStore();

  return (
    <HeaderStyle className="sticky p-3" style={{ top: 0 }}>
      <div className="flex justify-between container mx-auto pl-3">
        <embed src={Logo} className="h-10" alt="Logo" />
        <section className="sec-nav flex justify-end items-center">
          {[
            {
              Icon: Menu,
              text: "Menu",
              route: "/Menu",
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
            <li key={idx} className="px-2 inline-flex gap-2 items-center">
              {<e.Icon />}
              {/* <span className="text-sm">{e.text}</span> */}
            </li>
          ))}
          {/* <ThemeToggle isDarkMode={store.isDarkMode} onClick={action({ type: 'TOGGLE_DARK_MODE'})} /> */}
        </section>
      </div>
    </HeaderStyle>
  );
};
