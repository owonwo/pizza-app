import React from "react";
import styled, { ThemeProvider } from "@wigxel/react-components";
import { Header, HeaderStyle, Nav } from "../components/Header";
import { useLayout } from "../libs/LayoutStore";
import { Light, Dark } from "../libs/Theme";
// import useAuth from "../hooks/useAuth";

const StyledLayout = styled.section`
	color: ${(props) => props.theme.textColor};
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
	        <HeaderStyle className="fixed bottom-0 w-full bg-white shadow-lg md:hidden border-t border-mix">
	        	<Nav className="w-full justify-between px-3 py-3" />
	        </HeaderStyle>
	        <div className="h-24 md:hidden" />
	      </StyledLayout>
	    </ThemeProvider>
  );
};

export default Layout;
