import React from "react";
import { Container, Profile, Welcome, Username } from "./styles";
import { emojis } from "../../utils";

const Header = (props) => {
  const adminUser = localStorage.getItem("@sorteio-admin:user") || "";
  
  return (
    <Container>
      <h1>Logo</h1>
      <Profile>
        {adminUser && (
          <>
            <Welcome>Olá, {emojis.cash}</Welcome>
            <Username>{adminUser}</Username>
          </>
        )}
      </Profile>
    </Container>
  );
};

export default Header;
