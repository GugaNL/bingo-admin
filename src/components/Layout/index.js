import React from "react";
import { Container } from "./styles";
//Components
import Aside from "../Aside";
import Header from "../Header";
import Content from "../Content";

const Layout = ({ children }) => {
  return (
    <Container>
      <Aside />
      <Header />
      <Content>
        {children}
      </Content>
    </Container>
  );
};

export default Layout;
