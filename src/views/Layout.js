import React from "react";
import { useLocation, Redirect, Link } from "react-router-dom";
import styled, { css, ThemeProvider } from "@wigxel/react-components";
import { Header } from "../components/Header";
import NavItem from "../components/NavItem";
import { IconLinks } from "../components/Icons";
import { useLayout } from "../libs/LayoutStore";
import { Light, Dark } from "../libs/Theme";
import { navLinks } from "../libs/data/navigation";
import useAuth from "../hooks/useAuth";

const SidebarStyle = styled.aside`
  top: 60px;
  width: 50px;
  height: calc(100vh - 80px);
  display: flex;
  position: sticky;
  overflow: hidden;
  flex-flow: column nowrap;
  justify-content: space-between;
  transition: width 0.3s cubic-bezier(0.23, 1, 0.32, 1);

  ${(props) =>
    props.expand &&
    css`
      width: 20vw;
    `}

  > div#toggle-area {
    min-height: calc(70px - 1rem);
    width: 100%;
  }
`;

export const SideBar = (props) => {
  const { store } = useLayout();
  const { logoutUser, signedIn } = useAuth();
  const { pathname } = useLocation();

  return (
    <SidebarStyle expand={store.menuOpen} className="p-3">
      {signedIn === false && <Redirect to="/" />}
      <nav className="-mx-3" style={{ minWidth: "250px" }}>
        {navLinks.map((e, idx) => {
          return (
            <Link key={idx} to={e.path || ""} className="outline-none">
              <NavItem
                activity={e.activity}
                path={e.path}
                active={e.path === pathname}
                icon={<img src={e.icon} alt={e.text} />}
              >
                {e.text}
              </NavItem>
            </Link>
          );
        })}
      </nav>
      <nav className="-mx-3" style={{ minWidth: "15rem" }}>
        <a
          onClick={() => logoutUser().then(() => window.location.replace("/"))}
        >
          <NavItem>Logout</NavItem>
        </a>
      </nav>
    </SidebarStyle>
  );
};

const MainArea = ({ children }) => {
  return (
    <main className="p-5 pb-0 relative min-h-screen" style={{ zIndex: 3 }}>
      {children}
    </main>
  );
};

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
