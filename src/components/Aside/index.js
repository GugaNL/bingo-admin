import React, { useState } from "react";
import {
  Container,
  Header,
  Logo,
  Title,
  MenuContainer,
  MenuItemLink,
  MenuItemButton,
  ToogleMenu,
} from "./styles";
import logo from "../../assets/logo.svg";
import { menuItems } from "../../utils";
import {
  FaStaylinked,
  FaWpforms,
  FaAddressBook,
  FaSignOutAlt,
  FaRegLifeRing,
} from "react-icons/fa";
import { MdClose, MdMenu } from "react-icons/md";
import { useAuth } from "../../hooks/auth";

const Aside = () => {
  const { signOut } = useAuth();
  const [showToggleMenu, setShowToggleMenu] = useState(false);

  const handleToggleMenu = () => {
    setShowToggleMenu(!showToggleMenu);
  };

  const renderIcon = (itemIcon) => {
    if (itemIcon === "FaStaylinked") {
      return <FaStaylinked />;
    } else if (itemIcon === "FaWpforms") {
      return <FaWpforms />;
    } else if (itemIcon === "FaAddressBook") {
      return <FaAddressBook />;
    }
    return <FaRegLifeRing />;
  };

  return (
    <Container menuIsOpen={showToggleMenu}>
      <Header>
        <ToogleMenu onClick={() => handleToggleMenu()}>
          {showToggleMenu ? <MdClose /> : <MdMenu />}
        </ToogleMenu>
        <Logo src={logo} alt="Logo sorteio" />
        <Title>Sorteios</Title>
      </Header>
      <MenuContainer>
        {menuItems &&
          menuItems.length > 0 &&
          menuItems.map((item, index) => (
            <MenuItemLink href={item.link} key={index}>
              {renderIcon(item.icon)}
              {item.name}
            </MenuItemLink>
          ))}
        <MenuItemButton onClick={signOut}>
          <FaSignOutAlt />
          Sair
        </MenuItemButton>
      </MenuContainer>
    </Container>
  );
};

export default Aside;
