import React from "react";
import {
  Container,
  Header,
  Logo,
  Title,
  MenuContainer,
  MenuItemLink,
} from "./styles";
import logo from "../../assets/logo.svg";
import { menuItems } from "../../utils";
import {FaStaylinked, FaWpforms, FaAddressBook, FaSignOutAlt, FaRegLifeRing} from 'react-icons/fa';

const Aside = (props) => {

    const renderIcon = itemIcon => {
        if (itemIcon === 'FaStaylinked') {
            return <FaStaylinked />
        } else if (itemIcon === 'FaWpforms') {
            return <FaWpforms />
        } else if (itemIcon === 'FaAddressBook') {
            return <FaAddressBook />
        } else if (itemIcon === 'FaSignOutAlt') {
            return <FaSignOutAlt />
        }
        return <FaRegLifeRing />
    }

  return (
    <Container>
      <Header>
        <Logo src={logo} alt="Logo sorteio" />
        <Title>Sorteios</Title>
      </Header>
      <MenuContainer>
        {menuItems &&
          menuItems.length > 0 &&
          menuItems.map((item) => (
            <MenuItemLink href={item.link}>{renderIcon(item.icon)}{item.name}</MenuItemLink>
          ))}
      </MenuContainer>
    </Container>
  );
};

export default Aside;
