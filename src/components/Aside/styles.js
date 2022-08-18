import styled from "styled-components";

export const Container = styled.div`
  grid-area: AS;
  background-color: #252a48;
  background-image: linear-gradient(160deg, #252a48 0%, #6873b2 100%);
  border-right: 1px solid ${(props) => props.theme.color.gray};
  padding-left: 20px;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  height: 70px;
`;

export const Logo = styled.img`
  height: 40px;
  width: 40px;
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
