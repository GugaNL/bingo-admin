import styled from "styled-components";

export const Container = styled.div`
  grid-area: H;
  background-color: ${props => props.theme.color.darkBlue};
  //background-image: linear-gradient(160deg, #252a48 0%, #6873b2 100%);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 15px;
  border-bottom: 1px solid ${(props) => props.theme.color.gray};

  @media(max-width: 600px) {
    border: none;
    position: fixed;
    width: 100%;
    height: 70px;
  }
`;

export const Profile = styled.div`
  color: ${(props) => props.theme.color.white};
`;

export const Welcome = styled.h3``;

export const Username = styled.span``;
