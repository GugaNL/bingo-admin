import React from "react";
import { Container, Profile, Welcome, Username } from "./styles";
import { emojis } from '../../utils';

const Header = (props) => {
  return (
    <Container>
      <h1>Logo</h1>
      <Profile>
        <Welcome>Olá, {emojis.cash}</Welcome>
        <Username>Kakaliano</Username>
      </Profile>
    </Container>
  );
};

export default Header;
