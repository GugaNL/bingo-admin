import styled, { css } from "styled-components";

export const Container = styled.div`
  grid-area: AS;
  background-color: ${props => props.theme.color.darkBlue};
  //background-image: linear-gradient(160deg, #252a48 0%, #6873b2 100%);
  border-right: 1px solid ${(props) => props.theme.color.gray};
  padding-left: 20px;
  position: relative;

  @media (max-width: 600px) {
    padding: 0 7px;
    position: fixed;
    z-index: 2;

    height: ${(props) => (props.menuIsOpen ? "100vh" : "70px")};
    overflow: hidden; //esconde o que está dentro do container, senão iria exibi-los
    ${(props) =>
      !props.menuIsOpen &&
      css`
        border: none;
      `}
  }

  @media(max-width: 380px) {
    padding-right: 8px;
  }
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  height: 70px;
`;

export const Logo = styled.img`
  height: 40px;
  width: 40px;

  @media (max-width: 600px) {
    display: none;
  }
`;

export const Title = styled.h3`
  color: ${(props) => props.theme.color.white};
  margin-left: 10px;
`;

export const MenuContainer = styled.nav`
  margin-top: 50px;
  display: flex;
  flex-direction: column;
`;

export const MenuItemLink = styled.a`
  display: flex;
  align-items: center;
  color: ${(props) => props.theme.color.white};
  text-decoration: none;
  transition: opacity 0.3s;
  margin: 8px 0;

  &:hover {
    opacity: 0.7;
  }

  > svg {
    font-size: 18px;
    margin-right: 5px;
  }
`;

export const ToogleMenu = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 5px;
  font-size: 22px;
  background-color: ${(props) => props.theme.color.orange};
  color: ${(props) => props.theme.color.white};
  transition: opacity 0.3s;
  display: none;

  &:hover {
    opacity: 0.7;
  }

  @media (max-width: 600px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
