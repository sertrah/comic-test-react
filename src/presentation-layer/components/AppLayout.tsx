import React, { FunctionComponent } from "react";
import Footer from "./Footer";
import Header from "./Header";

type AppLayoutProps = {
  children?: React.ReactNode;
};

const AppLayout: FunctionComponent<AppLayoutProps> = ({ children }) => (
  <>
    <Header />
    <main id="main--container">{children}</main>
    <Footer />
  </>
);

export default AppLayout;
