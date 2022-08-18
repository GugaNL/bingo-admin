import styled from "styled-components";

export const Container = styled.div`
  grid-area: H;
  background-color: #fbab7e;
  background-image: linear-gradient(62deg, #fbab7e 0%, #f7ce68 100%);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 15px;
  border-bottom: 1px solid ${(props) => props.theme.color.gray};
`;

export const Profile = styled.div`
  color: ${(props) => props.theme.color.white};
`;

export const Welcome = styled.h3``;

export const Username = styled.span``;
