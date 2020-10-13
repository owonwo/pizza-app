import React from "react";
import styled, { ThemeProvider } from "@wigxel/react-components";
import { Header } from "../components/Header";
import { useLayout } from "../libs/LayoutStore";
import { Light, Dark } from "../libs/Theme";
// import useAuth from "../hooks/useAuth";

const StyledLayout = styled.section`
  background-color: ${(props) => props.theme.whitesmoke};
`;

const Layout = ({ children }) => {
  const { store } = useLayout();

  return (
    <ThemeProvider theme={store.isDarkMode ? Dark : Light}>
      <StyledLayout className="min-h-screen">
        <Header />
        <section className="flex flex-col container lg:w-2/3 mx-auto">
          {children}
        </section>
      </StyledLayout>
    </ThemeProvider>
  );
};

export default Layout;
